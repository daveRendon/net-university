{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "adminUsername": {
            "type": "string",
            "metadata": {
                "description": "Admin username on all VMs."
            }
        },
        "adminPassword": {
            "type": "securestring",
            "metadata": {
                "description": "Admin password on all VMs."
            }
        }
    },
    "variables": {
        "backendLoadBalancer": "backendLoadBalancer",
        "appGateway": "appGateway",
        "backendVnet": "backendVnet",
        "frontendVnet": "frontendVnet",
        "publicIP": "publicIP",
        "frontendScaleSet": "frontend",
        "backendScaleSet": "backend",
        "frontendNSG": "frontendNSG",
        "backendNSG": "backendNSG",
        "appGatewaySubnet": "appGateway",
        "backendSubnet": "backendSubnet",
        "frontendSubnet": "frontendSubnet"
    },
    "resources": [
        {
            "type": "Microsoft.Network/publicIPAddresses",
            "sku": {
                "name": "Basic"
            },
            "name": "[variables('publicIP')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "publicIPAddressVersion": "IPv4",
                "publicIPAllocationMethod": "Dynamic",
                "idleTimeoutInMinutes": 4
            },
            "dependsOn": []
        },
        {
            "type": "Microsoft.Network/applicationGateways",
            "name": "[variables('appGateway')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "sku": {
                    "name": "Standard_Medium",
                    "tier": "Standard",
                    "capacity": 2
                },
                "gatewayIPConfigurations": [
                    {
                        "name": "appGatewayIpConfig",
                        "properties": {
                            "subnet": {
                                "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('frontendVnet'), variables('appGatewaySubnet'))]"
                            }
                        }
                    }
                ],
                "sslCertificates": [],
                "authenticationCertificates": [],
                "frontendIPConfigurations": [
                    {
                        "name": "appGatewayFrontendIP",
                        "properties": {
                            "privateIPAllocationMethod": "Dynamic",
                            "publicIPAddress": {
                                "id": "[resourceId('Microsoft.Network/publicIPAddresses', variables('publicIP'))]"
                            }
                        }
                    }
                ],
                "frontendPorts": [
                    {
                        "name": "appGatewayFrontendPort",
                        "properties": {
                            "port": 80
                        }
                    }
                ],
                "backendAddressPools": [
                    {
                        "name": "[concat(variables('appGateway'), 'BackendPool')]"
                    },
                    {
                        "name": "[concat(variables('appGateway'), 'FrontendPool')]"
                    }
                ],
                "backendHttpSettingsCollection": [
                    {
                        "name": "appGatewayHttpSettings",
                        "properties": {
                            "port": 80,
                            "protocol": "Http",
                            "cookieBasedAffinity": "Disabled",
                            "pickHostNameFromBackendAddress": false,
                            "requestTimeout": 30
                        }
                    }
                ],
                "httpListeners": [
                    {
                        "name": "appGatewayHttpListener",
                        "properties": {
                            "frontendIPConfiguration": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/frontendIPConfigurations/', variables('appGateway'), 'FrontendIP')]"
                            },
                            "frontendPort": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/frontendPorts/', variables('appGateway'), 'FrontendPort')]"
                            },
                            "protocol": "Http",
                            "requireServerNameIndication": false
                        }
                    }
                ],
                "requestRoutingRules": [
                    {
                        "name": "rule1",
                        "properties": {
                            "ruleType": "Basic",
                            "httpListener": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/httpListeners/', variables('appGateway'), 'HttpListener')]"
                            },
                            "backendAddressPool": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/backendAddressPools/', variables('appGateway'), 'BackendPool')]"
                            },
                            "backendHttpSettings": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/backendHttpSettingsCollection/', variables('appGateway'), 'HttpSettings')]"
                            }
                        }
                    }
                ],
                "enableHttp2": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('frontendVnet'), variables('appGatewaySubnet'))]",
                "[resourceId('Microsoft.Network/publicIPAddresses', variables('publicIP'))]"
            ]
        },
        {
            "type": "Microsoft.Network/virtualNetworks",
            "name": "[variables('frontendVnet')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "addressSpace": {
                    "addressPrefixes": [
                        "10.1.0.0/16"
                    ]
                },
                "subnets": [
                    {
                        "name": "appGateway",
                        "properties": {
                            "addressPrefix": "10.1.1.0/24"
                        }
                    },
                    {
                        "name": "frontendSubnet",
                        "properties": {
                            "addressPrefix": "10.1.2.0/24",
                            "networkSecurityGroup": {
                                "id": "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]"
                            }
                        }
                    }
                ],
                "virtualNetworkPeerings": [
                    {
                        "name": "peering",
                        "properties": {
                            "remoteVirtualNetwork": {
                                "id": "[resourceId('Microsoft.Network/virtualNetworks', variables('backendVnet'))]"
                            },
                            "allowVirtualNetworkAccess": true,
                            "allowForwardedTraffic": false,
                            "allowGatewayTransit": false,
                            "useRemoteGateways": false,
                            "remoteAddressSpace": {
                                "addressPrefixes": [
                                    "10.0.0.0/16"
                                ]
                            }
                        }
                    }
                ],
                "enableDdosProtection": false,
                "enableVmProtection": false
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]",
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('backendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Network/virtualNetworks/subnets",
            "name": "[concat(variables('frontendVnet'), '/', variables('appGatewaySubnet'))]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "addressPrefix": "10.1.1.0/24"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks', variables('frontendVnet'))]"
            ]
        },
        {
            "type": "Microsoft.Network/virtualNetworks/subnets",
            "name": "[concat(variables('frontendVnet'), '/', variables('frontendSubnet'))]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "addressPrefix": "10.1.2.0/24",
                "networkSecurityGroup": {
                    "id": "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]"
                }
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks', variables('frontendVnet'))]",
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups",
            "name": "[variables('frontendNSG')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "securityRules": [
                    {
                        "name": "AllowHTTP",
                        "properties": {
                            "protocol": "TCP",
                            "sourcePortRange": "*",
                            "destinationPortRange": "80",
                            "sourceAddressPrefix": "Internet",
                            "destinationAddressPrefix": "10.1.2.0/24",
                            "access": "Allow",
                            "priority": 100,
                            "direction": "Inbound"
                        }
                    },
                    {
                        "name": "AllowHTTPS",
                        "properties": {
                            "protocol": "TCP",
                            "sourcePortRange": "*",
                            "destinationPortRange": "443",
                            "sourceAddressPrefix": "Internet",
                            "destinationAddressPrefix": "10.1.2.0/24",
                            "access": "Allow",
                            "priority": 110,
                            "direction": "Inbound"
                        }
                    }
                ]
            }
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups/securityRules",
            "name": "[concat(variables('frontendNSG'), '/AllowHTTP')]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "protocol": "TCP",
                "sourcePortRange": "*",
                "destinationPortRange": "80",
                "sourceAddressPrefix": "Internet",
                "destinationAddressPrefix": "10.1.2.0/24",
                "access": "Allow",
                "priority": 100,
                "direction": "Inbound"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups/securityRules",
            "name": "[concat(variables('frontendNSG'), '/AllowHTTPS')]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "protocol": "TCP",
                "sourcePortRange": "*",
                "destinationPortRange": "443",
                "sourceAddressPrefix": "Internet",
                "destinationAddressPrefix": "10.1.2.0/24",
                "access": "Allow",
                "priority": 110,
                "direction": "Inbound"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('frontendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Network/virtualNetworks",
            "name": "[variables('backendVnet')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "addressSpace": {
                    "addressPrefixes": [
                        "10.0.0.0/16"
                    ]
                },
                "subnets": [
                    {
                        "name": "backendSubnet",
                        "properties": {
                            "addressPrefix": "10.0.0.0/24"
                        }
                    }
                ],
                "virtualNetworkPeerings": [],
                "enableDdosProtection": false,
                "enableVmProtection": false
            },
            "dependsOn": []
        },
        {
            "type": "Microsoft.Network/virtualNetworks/subnets",
            "name": "[concat(variables('backendVnet'), '/', variables('backendSubnet'))]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "addressPrefix": "10.0.0.0/24"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks', variables('backendVnet'))]"
            ]
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups",
            "name": "[variables('backendNSG')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "securityRules": [
                    {
                        "name": "AllowSQL",
                        "properties": {
                            "protocol": "TCP",
                            "sourcePortRange": "*",
                            "destinationPortRange": "1433",
                            "sourceAddressPrefix": "10.1.2.0/24",
                            "destinationAddressPrefix": "*",
                            "access": "Allow",
                            "priority": 100,
                            "direction": "Inbound"
                        }
                    },
                    {
                        "name": "DenyInternet",
                        "properties": {
                            "protocol": "*",
                            "sourcePortRange": "*",
                            "destinationPortRange": "*",
                            "sourceAddressPrefix": "*",
                            "destinationAddressPrefix": "Internet",
                            "access": "Deny",
                            "priority": 100,
                            "direction": "Outbound"
                        }
                    }
                ]
            }
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups/securityRules",
            "name": "[concat(variables('backendNSG'), '/AllowSQL')]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "protocol": "TCP",
                "sourcePortRange": "*",
                "destinationPortRange": "1433",
                "sourceAddressPrefix": "10.1.2.0/24",
                "destinationAddressPrefix": "*",
                "access": "Allow",
                "priority": 100,
                "direction": "Inbound"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('backendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Network/networkSecurityGroups/securityRules",
            "name": "[concat(variables('backendNSG'), '/DenyInternet')]",
            "apiVersion": "2018-02-01",
            "scale": null,
            "properties": {
                "protocol": "*",
                "sourcePortRange": "*",
                "destinationPortRange": "*",
                "sourceAddressPrefix": "*",
                "destinationAddressPrefix": "Internet",
                "access": "Deny",
                "priority": 100,
                "direction": "Outbound"
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/networkSecurityGroups', variables('backendNSG'))]"
            ]
        },
        {
            "type": "Microsoft.Compute/virtualMachineScaleSets",
            "name": "[variables('frontendScaleSet')]",
            "sku": {
                "name": "Standard_DS1_v2",
                "tier": "Standard",
                "capacity": 3
            },
            "apiVersion": "2017-12-01",
            "location": "eastus2",
            "zones": [
                "1",
                "2",
                "3"
            ],
            "scale": null,
            "properties": {
                "singlePlacementGroup": true,
                "upgradePolicy": {
                    "mode": "Automatic",
                    "automaticOSUpgrade": false
                },
                "virtualMachineProfile": {
                    "osProfile": {
                        "computerNamePrefix": "frontend",
                        "adminUsername": "[parameters('adminUsername')]",
                        "adminPassword": "[parameters('adminPassword')]",
                        "windowsConfiguration": {
                            "provisionVMAgent": true,
                            "enableAutomaticUpdates": true
                        }
                    },
                    "storageProfile": {
                        "osDisk": {
                            "createOption": "FromImage",
                            "caching": "ReadWrite",
                            "managedDisk": {
                                "storageAccountType": "Premium_LRS"
                            }
                        },
                        "imageReference": {
                            "publisher": "MicrosoftWindowsServer",
                            "offer": "WindowsServer",
                            "sku": "2016-Datacenter",
                            "version": "latest"
                        }
                    },
                    "networkProfile": {
                        "networkInterfaceConfigurations": [
                            {
                                "name": "[concat(variables('frontendScaleSet'),'Nic')]",
                                "properties": {
                                    "primary": true,
                                    "enableAcceleratedNetworking": false,
                                    "enableIPForwarding": false,
                                    "ipConfigurations": [
                                        {
                                            "name": "[concat(variables('frontendScaleSet'),'IpConfig')]",
                                            "properties": {
                                                "subnet": {
                                                    "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('frontendVnet'), variables('frontendSubnet'))]"
                                                },
                                                "privateIPAddressVersion": "IPv4",
                                                "applicationGatewayBackendAddressPools": [
                                                    {
                                                        "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/applicationGateways/', variables('appGateway'), '/backendAddressPools/appGatewayBackendPool')]"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "priority": "Regular"
                },
                "overprovision": true
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('frontendVnet'), variables('frontendSubnet'))]",
                "[resourceId('Microsoft.Network/applicationGateways', variables('appGateway'))]"
            ]
        },
        {
            "type": "Microsoft.Insights/autoscaleSettings",
            "apiVersion": "2015-04-01",
            "name": "Autoscale",
            "location": "eastus2",
            "dependsOn": [
                "[concat('Microsoft.Compute/virtualMachineScaleSets/', variables('frontendScaleSet'))]"
            ],
            "properties": {
                "name": "Autoscale",
                "targetResourceUri": "[concat('/subscriptions/',subscription().subscriptionId, '/resourceGroups/',  resourceGroup().name, '/providers/Microsoft.Compute/virtualMachineScaleSets/', variables('frontendScaleSet'))]",
                "enabled": true,
                "profiles": [
                    {
                        "name": "Autoscale by percentage based on CPU usage",
                        "capacity": {
                            "minimum": "2",
                            "maximum": "10",
                            "default": "3"
                        },
                        "rules": [
                            {
                                "metricTrigger": {
                                    "metricName": "Percentage CPU",
                                    "metricNamespace": "",
                                    "metricResourceUri": "[concat('/subscriptions/',subscription().subscriptionId, '/resourceGroups/',  resourceGroup().name, '/providers/Microsoft.Compute/virtualMachineScaleSets/', variables('frontendScaleSet'))]",
                                    "timeGrain": "PT1M",
                                    "statistic": "Average",
                                    "timeWindow": "PT5M",
                                    "timeAggregation": "Average",
                                    "operator": "GreaterThan",
                                    "threshold": 70
                                },
                                "scaleAction": {
                                    "direction": "Increase",
                                    "type": "ChangeCount",
                                    "value": "1",
                                    "cooldown": "PT5M"
                                }
                            },
                            {
                                "metricTrigger": {
                                    "metricName": "Percentage CPU",
                                    "metricNamespace": "",
                                    "metricResourceUri": "[concat('/subscriptions/',subscription().subscriptionId, '/resourceGroups/',  resourceGroup().name, '/providers/Microsoft.Compute/virtualMachineScaleSets/', variables('frontendScaleSet'))]",
                                    "timeGrain": "PT1M",
                                    "statistic": "Average",
                                    "timeWindow": "PT5M",
                                    "timeAggregation": "Average",
                                    "operator": "LessThan",
                                    "threshold": 30
                                },
                                "scaleAction": {
                                    "direction": "Decrease",
                                    "type": "ChangeCount",
                                    "value": "1",
                                    "cooldown": "PT5M"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "type": "Microsoft.Network/loadBalancers",
            "sku": {
                "name": "Standard"
            },
            "name": "[variables('backendLoadBalancer')]",
            "apiVersion": "2018-02-01",
            "location": "eastus2",
            "scale": null,
            "properties": {
                "frontendIPConfigurations": [
                    {
                        "name": "loadBalancerFrontEnd",
                        "properties": {
                            "privateIPAddress": "10.0.0.4",
                            "privateIPAllocationMethod": "Dynamic",
                            "subnet": {
                                "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('backendVnet'), variables('backendSubnet'))]"
                            }
                        }
                    }
                ],
                "backendAddressPools": [
                    {
                        "name": "[concat(variables('backendLoadBalancer'),'BEPool')]"
                    }
                ],
                "probes": [
                    {
                        "name": "tcpProbe",
                        "properties": {
                            "protocol": "tcp",
                            "port": 1433,
                            "intervalInSeconds": 5,
                            "numberOfProbes": 2
                        }
                    }
                ],
                "loadBalancingRules": [
                    {
                        "name": "LBRule",
                        "properties": {
                            "frontendIPConfiguration": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/frontendIPConfigurations/loadBalancerFrontEnd')]"
                            },
                            "backendAddressPool": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/backendAddressPools/', variables('backendLoadBalancer'), 'BEPool')]"
                            },
                            "protocol": "tcp",
                            "frontendPort": 1433,
                            "backendPort": 1433,
                            "enableFloatingIP": false,
                            "idleTimeoutInMinutes": 5,
                            "probe": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/probes/tcpProbe')]"
                            }
                        }
                    }
                ],
                "inboundNatPools": [
                    {
                        "name": "[concat(variables('backendLoadBalancer'), 'NatPool')]",
                        "properties": {
                            "frontendIPConfiguration": {
                                "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/frontendIPConfigurations/loadBalancerFrontEnd')]"
                            },
                            "protocol": "tcp",
                            "frontendPortRangeStart": "50000",
                            "frontendPortRangeEnd": "50100",
                            "backendPort": "3389"
                        }
                    }
                ]
            },
            "dependsOn": [
                "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('backendVnet'), variables('backendSubnet'))]"
            ]
        },
        {
            "type": "Microsoft.Compute/virtualMachineScaleSets",
            "name": "backend",
            "location": "eastus2",
            "zones": [
                "1",
                "2",
                "3"
            ],
            "apiVersion": "2017-12-01",
            "dependsOn": [
                "[concat('Microsoft.Network/virtualNetworks/', variables('backendVnet'))]",
                "[concat('Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'))]"
            ],
            "sku": {
                "name": "Standard_DS1_v2",
                "tier": "Standard",
                "capacity": "3"
            },
            "properties": {
                "upgradePolicy": {
                    "mode": "Automatic"
                },
                "virtualMachineProfile": {
                    "storageProfile": {
                        "osDisk": {
                            "caching": "ReadOnly",
                            "createOption": "FromImage"
                        },
                        "imageReference": {
                            "publisher": "MicrosoftWindowsServer",
                            "offer": "WindowsServer",
                            "sku": "2016-Datacenter",
                            "version": "latest"
                        }
                    },
                    "osProfile": {
                        "computerNamePrefix": "backend",
                        "adminUsername": "[parameters('adminUsername')]",
                        "adminPassword": "[parameters('adminPassword')]"
                    },
                    "networkProfile": {
                        "networkInterfaceConfigurations": [
                            {
                                "name": "[concat(variables('backendScaleSet'), 'Nic')]",
                                "properties": {
                                    "primary": "true",
                                    "ipConfigurations": [
                                        {
                                            "name": "[concat(variables('backendScaleSet'), 'IpConfig')]",
                                            "properties": {
                                                "subnet": {
                                                    "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('backendVnet'), variables('backendSubnet'))]"
                                                },
                                                "privateIPAddressVersion": "IPv4",
                                                "loadBalancerBackendAddressPools": [
                                                    {
                                                        "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/backendAddressPools/', variables('backendLoadBalancer'), 'BEPool')]"
                                                    }
                                                ],
                                                "loadBalancerInboundNatPools": [
                                                    {
                                                        "id": "[concat('/subscriptions/', subscription().subscriptionId,'/resourceGroups/', resourceGroup().name, '/providers/Microsoft.Network/loadBalancers/', variables('backendLoadBalancer'), '/inboundNatPools/', variables('backendLoadBalancer'), 'NatPool')]"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                "overprovision": true
            }
        }
    ]
}
