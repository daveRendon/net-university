{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "adminUsername": {
            "type": "string",
            "metadata": {
                "description": "Admin username"
            }
        },
        "adminPassword": {
            "type": "securestring",
            "metadata": {
                "description": "Admin password"
            }
        },
        "dnsNameforLBIP": {
            "type": "string",
            "defaultValue": "uniqueDnsNameforLBIP",
            "metadata": {
                "description": "Unique DNS name"
            }
        },
        "vmNamePrefix": {
            "type": "string",
            "defaultValue": "myVM",
            "metadata": {
                "description": "VM name prefix"
            }
        },
        "lbName": {
            "type": "string",
            "defaultValue": "myLB",
            "metadata": {
                "description": "Load Balancer name"
            }
        },
        "nicNamePrefix": {
            "type": "string",
            "defaultValue": "nic",
            "metadata": {
                "description": "Network Interface Name Prefix"
            }
        },
        "publicIPAddressName": {
            "type": "string",
            "defaultValue": "myPublicIP",
            "metadata": {
                "description": "Public IP Address Name"
            }
        },
        "vnetName": {
            "type": "string",
            "defaultValue": "myVNET",
            "metadata": {
                "description": "VNET name"
            }
        },
        "imagePublisher": {
            "type": "string",
            "defaultValue": "MicrosoftWindowsServer",
            "metadata": {
                "description": "Image Publisher"
            }
        },
        "imageOffer": {
            "type": "string",
            "defaultValue": "WindowsServer",
            "metadata": {
                "description": "Image Offer"
            }
        },
        "imageSKU": {
            "type": "string",
            "defaultValue": "2012-R2-Datacenter",
            "metadata": {
                "description": "Image SKU"
            }
        },
        "vmSize": {
            "type": "string",
            "defaultValue": "Standard_A1",
            "allowedValues": [
                "Standard_A0",
                "Standard_A1",
                "Standard_A2",
                "Standard_A3",
                "Standard_A4"
            ],
            "metadata": {
                "description": "VM Size"
            }
        }
    },
    "variables": {
        "storageAccountType": "Standard_LRS",
        "availabilitySetName": "myAvSet",
        "addressPrefix": "10.0.0.0/16",
        "subnetName": "Subnet-1",
        "subnetPrefix": "10.0.0.0/24",
        "publicIPAddressType": "Dynamic",
        "subnetRef": "[resourceId('Microsoft.Network/virtualNetworks/subnets', parameters('vnetName'), variables ('subnetName'))]",
        "publicIPAddressID": "[resourceId('Microsoft.Network/publicIPAddresses',parameters('publicIPAddressName'))]",
        "lbID": "[resourceId('Microsoft.Network/loadBalancers',parameters('lbName'))]",
        "numberOfInstances": 2,
        "frontEndIPConfigID": "[concat(variables('lbID'),'/frontendIPConfigurations/loadBalancerFrontend')]",
        "storageAccountName": "[uniqueString(resourceGroup().id)]"
    },
    "resources": [
        {
            "type": "Microsoft.Storage/storageAccounts",
            "name": "[variables('storageAccountName')]",
            "apiVersion": "2015-05-01-preview",
            "location": "[resourceGroup().location]",
            "properties": {
                "accountType": "[variables('storageAccountType')]"
            }
        },
        {
            "type": "Microsoft.Compute/availabilitySets",
            "name": "[variables('availabilitySetName')]",
            "apiVersion": "2016-04-30-preview",
            "location": "[resourceGroup().location]",
            "properties": {
                "platformFaultDomainCount": 2,
                "platformUpdateDomainCount": 2,
                "managed": true
            }
        },
        {
            "apiVersion": "2015-06-15",
            "type": "Microsoft.Network/publicIPAddresses",
            "name": "[parameters('publicIPAddressName')]",
            "location": "[resourceGroup().location]",
            "properties": {
                "publicIPAllocationMethod": "[variables('publicIPAddressType')]",
                "dnsSettings": {
                    "domainNameLabel": "[parameters('dnsNameforLBIP')]"
                }
            }
        },
        {
            "apiVersion": "2015-06-15",
            "type": "Microsoft.Network/virtualNetworks",
            "name": "[parameters('vnetName')]",
            "location": "[resourceGroup().location]",
            "properties": {
                "addressSpace": {
                    "addressPrefixes": [
                        "[variables('addressPrefix')]"
                    ]
                },
                "subnets": [
                    {
                        "name": "[variables('subnetName')]",
                        "properties": {
                            "addressPrefix": "[variables('subnetPrefix')]"
                        }
                    }
                ]
            }
        },
        {
            "apiVersion": "2015-06-15",
            "type": "Microsoft.Network/networkInterfaces",
            "name": "[concat(parameters('nicNamePrefix'), copyindex())]",
            "location": "[resourceGroup().location]",
            "copy": {
                "name": "nicLoop",
                "count": "[variables('numberOfInstances')]"
            },
            "dependsOn": [
                "[concat('Microsoft.Network/virtualNetworks/', parameters('vnetName'))]",
                "[concat('Microsoft.Network/loadBalancers/', parameters('lbName'))]",
                "[concat('Microsoft.Network/loadBalancers/', parameters('lbName'), '/inboundNatRules/', 'RDP-VM', copyIndex())]"
            ],
            "properties": {
                "ipConfigurations": [
                    {
                        "name": "ipconfig1",
                        "properties": {
                            "privateIPAllocationMethod": "Dynamic",
                            "subnet": {
                                "id": "[variables('subnetRef')]"
                            },
                            "loadBalancerBackendAddressPools": [
                                {
                                    "id": "[concat(variables('lbID'), '/backendAddressPools/LoadBalancerBackend')]"
                                }
                            ],
                            "loadBalancerInboundNatRules": [
                                {
                                    "id": "[concat(variables('lbID'),'/inboundNatRules/RDP-VM', copyindex())]"
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "apiVersion": "2015-06-15",
            "name": "[parameters('lbName')]",
            "type": "Microsoft.Network/loadBalancers",
            "location": "[resourceGroup().location]",
            "dependsOn": [
                "[concat('Microsoft.Network/publicIPAddresses/', parameters('publicIPAddressName'))]"
            ],
            "properties": {
                "frontendIPConfigurations": [
                    {
                        "name": "LoadBalancerFrontend",
                        "properties": {
                            "publicIPAddress": {
                                "id": "[variables('publicIPAddressID')]"
                            }
                        }
                    }
                ],
                "backendAddressPools": [
                    {
                        "name": "LoadBalancerBackend"
                    }
                ]
            }
        },
        {
            "apiVersion": "2015-06-15",
            "type": "Microsoft.Network/loadBalancers/inboundNatRules",
            "name": "[concat(parameters('lbName'), '/', 'RDP-VM', copyIndex())]",
            "location": "[resourceGroup().location]",
            "copy": {
                "name": "lbNatLoop",
                "count": "[variables('numberOfInstances')]"
            },
            "dependsOn": [
                "[concat('Microsoft.Network/loadBalancers/', parameters('lbName'))]"
            ],
            "properties": {
                "frontendIPConfiguration": {
                    "id": "[variables('frontEndIPConfigID')]"
                },
                "protocol": "Tcp",
                "frontendPort": "[copyIndex(5000)]",
                "backendPort": 3389,
                "enableFloatingIP": false
            }
        },
        {
            "apiVersion": "2016-04-30-preview",
            "type": "Microsoft.Compute/virtualMachines",
            "name": "[concat(parameters('vmNamePrefix'), copyindex())]",
            "copy": {
                "name": "virtualMachineLoop",
                "count": "[variables('numberOfInstances')]"
            },
            "location": "[resourceGroup().location]",
            "dependsOn": [
                "[concat('Microsoft.Storage/storageAccounts/', variables('storageAccountName'))]",
                "[concat('Microsoft.Network/networkInterfaces/', parameters('nicNamePrefix'), copyindex())]",
                "[concat('Microsoft.Compute/availabilitySets/', variables('availabilitySetName'))]"
            ],
            "properties": {
                "availabilitySet": {
                    "id": "[resourceId('Microsoft.Compute/availabilitySets',variables('availabilitySetName'))]"
                },
                "hardwareProfile": {
                    "vmSize": "[parameters('vmSize')]"
                },
                "osProfile": {
                    "computerName": "[concat(parameters('vmNamePrefix'), copyIndex())]",
                    "adminUsername": "[parameters('adminUsername')]",
                    "adminPassword": "[parameters('adminPassword')]"
                },
                "storageProfile": {
                    "imageReference": {
                        "publisher": "[parameters('imagePublisher')]",
                        "offer": "[parameters('imageOffer')]",
                        "sku": "[parameters('imageSKU')]",
                        "version": "latest"
                    },
                    "osDisk": {
                        "createOption": "FromImage"
                    }
                },
                "networkProfile": {
                    "networkInterfaces": [
                        {
                            "id": "[resourceId('Microsoft.Network/networkInterfaces',concat(parameters('nicNamePrefix'),copyindex()))]"
                        }
                    ]
                },
                "diagnosticsProfile": {
                    "bootDiagnostics": {
                        "enabled": true,
                        "storageUri": "[concat('http://',variables('storageAccountName'),'.blob.core.windows.net')]"
                    }
                }
            }
        }
    ]
}
