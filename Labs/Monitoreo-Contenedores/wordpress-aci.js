{
  "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountType": {
      "type": "string",
      "defaultValue": "Standard_LRS",
      "allowedValues": [
        "Standard_LRS",
        "Standard_GRS",
        "Standard_ZRS"
      ],
      "metadata": {
        "description": "Storage Account type"
      }
    },
    "storageAccountName": {
      "type": "string",
      "defaultValue": "[uniquestring(resourceGroup().id)]",
      "metadata": {
        "description": "Storage Account Name"
      }
    },
    "wordpressBlogName": {
      "type": "string",
      "defaultValue": "User's Blog",
      "metadata": {
        "description": "WordPress Blog Name"
      }
    },
    "wordpressUsername": {
      "type": "string",
      "defaultValue": "user",
      "metadata": {
        "description": "WordPress admin User"
      }
    },
    "wordpressPassword": {
      "type": "securestring",
      "defaultValue": "bitnami",
      "metadata": {
        "description": "WordPress admin Password"
      }
    },
    "wordpressEmail": {
      "type": "string",
      "defaultValue": "user@example.com",
      "metadata": {
        "description": "WordPress admin e-mail"
      }
    },
    "wordpressFirstName": {
      "type": "string",
      "defaultValue": "FirstName",
      "metadata": {
        "description": "WordPress admin first name"
      }
    },
    "wordpressLastName": {
      "type": "string",
      "defaultValue": "LastName",
      "metadata": {
        "description": "WordPress admin last name"
      }
    },
    "databaseUser": {
      "type": "string",
      "defaultValue": "bn_wordpress",
      "metadata": {
        "description": "WordPress' database user"
      }
    },
    "databaseName": {
      "type": "string",
      "defaultValue": "bitnami_wordpress",
      "metadata": {
        "description": "WordPress' database name"
      }
    }
  },
  "variables": {
    "shareContainerGroupName": "createshare-container-instance",
    "wordpressShareName": "wordpress-share",
    "mysqlShareName": "mysql-share",
    "wordpressContainerGroupName": "wordpress-container-instance",
    "wordpressContainerName": "wordpress",
    "mysqlContainerName": "mysql",
    "wordpressImageTag": "latest",
    "mysqlImageTag": "latest",
    "cpuCores": "2",
    "memoryInGb": "2"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "name": "[parameters('storageAccountName')]",
      "apiVersion": "2017-10-01",
      "location": "[resourceGroup().location]",
      "sku": {
        "name": "[parameters('storageAccountType')]"
      },
      "kind": "Storage",
      "properties": {}
    },
    {
      "name": "[variables('shareContainerGroupName')]",
      "type": "Microsoft.ContainerInstance/containerGroups",
      "apiVersion": "2018-02-01-preview",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[concat('Microsoft.Storage/storageAccounts/', parameters('storageAccountName'))]"
      ],
      "properties": {
        "containers": [
          {
            "name": "[variables('wordpressShareName')]",
            "properties": {
              "image": "microsoft/azure-cli",
              "command": [
                "az",
                "storage",
                "share",
                "create",
                "--name",
                "[variables('wordpressShareName')]"
              ],
              "environmentVariables": [
                {
                  "name": "AZURE_STORAGE_KEY",
                  "value": "[listKeys(parameters('storageAccountName'),'2017-10-01').keys[0].value]"
                },
                {
                  "name": "AZURE_STORAGE_ACCOUNT",
                  "value": "[parameters('storageAccountName')]"
                }
              ],
              "resources": {
                "requests": {
                  "cpu": "0.5",
                  "memoryInGb": "0.7"
                }
              }
            }
          },
          {
            "name": "[variables('mysqlShareName')]",
            "properties": {
              "image": "microsoft/azure-cli",
              "command": [
                "az",
                "storage",
                "share",
                "create",
                "--name",
                "[variables('mysqlShareName')]"
              ],
              "environmentVariables": [
                {
                  "name": "AZURE_STORAGE_KEY",
                  "value": "[listKeys(parameters('storageAccountName'),'2017-10-01').keys[0].value]"
                },
                {
                  "name": "AZURE_STORAGE_ACCOUNT",
                  "value": "[parameters('storageAccountName')]"
                }
              ],
              "resources": {
                "requests": {
                  "cpu": "0.5",
                  "memoryInGb": "0.7"
                }
              }
            }
          }
        ],
        "restartPolicy": "OnFailure",
        "osType": "Linux"
      }
    },
    {
      "type": "Microsoft.ContainerInstance/containerGroups",
      "name": "[variables('wordpressContainerGroupName')]",
      "apiVersion": "2017-10-01-preview",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[concat('Microsoft.ContainerInstance/containerGroups/', variables('shareContainerGroupName'))]"
      ],
      "properties": {
        "containers": [
          {
            "name": "[variables('mysqlContainerName')]",
            "properties": {
              "image": "[concat('bitnami/mysql:', variables('mysqlImageTag'))]",
              "resources": {
                "requests": {
                  "cpu": "[variables('cpuCores')]",
                  "memoryInGb": "[variables('memoryInGb')]"
                }
              },
              "ports": [
                {
                  "port": 3306
                }
              ],
              "volumeMounts": [
                {
                  "name": "mysql-data",
                  "mountPath": "/bitnami"
                }
              ],
              "environmentVariables": [
                {
                  "name": "ALLOW_EMPTY_PASSWORD",
                  "value": "yes"
                },
                {
                  "name": "MYSQL_USER",
                  "value": "[parameters('databaseUser')]"
                },
                {
                  "name": "MYSQL_DATABASE",
                  "value": "[parameters('databaseName')]"
                }
              ]
            }
          },
          {
            "name": "[variables('wordpressContainerName')]",
            "properties": {
              "image": "[concat('bitnami/wordpress:', variables('wordpressImageTag'))]",
              "resources": {
                "requests": {
                  "cpu": "[variables('cpuCores')]",
                  "memoryInGb": "[variables('memoryInGb')]"
                }
              },
              "ports": [
                {
                  "port": 80
                },
                {
                  "port": 443
                }
              ],
              "volumeMounts": [
                {
                  "name": "wordpress-data",
                  "mountPath": "/bitnami"
                }
              ],
              "environmentVariables": [
                {
                  "name": "MARIADB_HOST",
                  "value": "127.0.0.1"
                },
                {
                  "name": "MARIADB_PORT",
                  "value": 3306
                },
                {
                  "name": "ALLOW_EMPTY_PASSWORD",
                  "value": "yes"
                },
                {
                  "name": "WORDPRESS_DATABASE_USER",
                  "value": "[parameters('databaseUser')]"
                },
                {
                  "name": "WORDPRESS_DATABASE_NAME",
                  "value": "[parameters('databaseName')]"
                },
                {
                  "name": "WORDPRESS_USERNAME",
                  "value": "[parameters('wordpressUsername')]"
                },
                {
                  "name": "WORDPRESS_PASSWORD",
                  "value": "[parameters('wordpressPassword')]"
                },
                {
                  "name": "WORDPRESS_EMAIL",
                  "value": "[parameters('wordpressEmail')]"
                },
                {
                  "name": "WORDPRESS_FIRST_NAME",
                  "value": "[parameters('wordpressFirstName')]"
                },
                {
                  "name": "WORDPRESS_LAST_NAME",
                  "value": "[parameters('wordpressLastName')]"
                },
                {
                  "name": "WORDPRESS_BLOG_NAME",
                  "value": "[parameters('wordpressBlogName')]"
                }
              ]
            }
          }
        ],
        "osType": "Linux",
        "ipAddress": {
          "type": "Public",
          "ports": [
            {
              "protocol": "tcp",
              "port": "80"
            },
            {
              "protocol": "tcp",
              "port": "443"
            }
          ]
        },
        "volumes": [
          {
            "azureFile": {
              "shareName": "[variables('wordpressShareName')]",
              "storageAccountKey": "[listKeys(parameters('storageAccountName'),'2017-10-01').keys[0].value]",
              "storageAccountName": "[parameters('storageAccountName')]"
            },
            "name": "wordpress-data"
          },
          {
            "azureFile": {
              "shareName": "[variables('mysqlShareName')]",
              "storageAccountKey": "[listKeys(parameters('storageAccountName'),'2017-10-01').keys[0].value]",
              "storageAccountName": "[parameters('storageAccountName')]"
            },
            "name": "mysql-data"
          }
        ]
      }
    }
  ],
  "outputs": {
    "containerURL": {
      "type": "string",
      "value": "[concat('http://', reference(resourceId('Microsoft.ContainerInstance/containerGroups/', variables('wordpressContainerGroupName'))).ipAddress.ip, ':80')]"
    }
  }
}
