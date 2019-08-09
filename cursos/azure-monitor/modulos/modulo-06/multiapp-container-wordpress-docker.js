{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "servers_netunivsqldbdemo_createMode": {
            "type": "SecureString"
        },
        "sites_netunivdockerdemo_name": {
            "defaultValue": "netunivdockerdemo",
            "type": "String"
        },
        "serverfarms_wpdockerdemo_name": {
            "defaultValue": "wpdockerdemo",
            "type": "String"
        },
        "servers_netunivsqldbdemo_name": {
            "defaultValue": "netunivsqldb2",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.DBforMySQL/servers",
            "apiVersion": "2017-12-01",
            "name": "[parameters('servers_netunivsqldbdemo_name')]",
            "location": "eastus",
            "sku": {
                "name": "GP_Gen5_2",
                "tier": "GeneralPurpose",
                "family": "Gen5",
                "capacity": 2
            },
            "properties": {
                "storageProfile": {
                    "storageMB": 5120,
                    "backupRetentionDays": 7,
                    "geoRedundantBackup": "Disabled"
                },
                "version": "5.7",
                "sslEnforcement": "Enabled"
            }
        },
        {
            "type": "Microsoft.Web/serverfarms",
            "apiVersion": "2016-09-01",
            "name": "[parameters('serverfarms_wpdockerdemo_name')]",
            "location": "East US",
            "sku": {
                "name": "S1",
                "tier": "Standard",
                "size": "S1",
                "family": "S",
                "capacity": 1
            },
            "kind": "linux",
            "properties": {
                "name": "[parameters('serverfarms_wpdockerdemo_name')]",
                "perSiteScaling": false,
                "reserved": true,
                "targetWorkerCount": 0,
                "targetWorkerSizeId": 0
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/audit_log_enabled')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/audit_log_events')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "CONNECTION",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/audit_log_exclude_users')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "azure_superuser",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/binlog_group_commit_sync_delay')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/binlog_group_commit_sync_no_delay_count')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/character_set_server')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "latin1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/default_week_format')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/div_precision_increment')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/eq_range_index_dive_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "200",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/event_scheduler')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/flush_time')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/ft_query_expansion_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "20",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/group_concat_max_len')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1024",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/init_connect')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_adaptive_flushing')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_adaptive_flushing_lwm')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "10",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_adaptive_hash_index')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_adaptive_hash_index_parts')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_adaptive_max_sleep_delay')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "150000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_autoextend_increment')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "64",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_autoinc_lock_mode')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_buffer_pool_dump_pct')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "25",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_buffer_pool_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "3758096384",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_change_buffer_max_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "25",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_change_buffering')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "all",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_cmp_per_index_enabled')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_commit_concurrency')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_compression_failure_threshold_pct')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "5",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_compression_level')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "6",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_compression_pad_pct_max')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "50",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_concurrency_tickets')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "5000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_deadlock_detect')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_default_row_format')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "DYNAMIC",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_file_format')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "Barracuda",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_file_per_table')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_fill_factor')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "100",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_cache_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8000000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_enable_stopword')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_max_token_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "84",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_min_token_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "3",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_num_word_optimize')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_result_cache_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2000000000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_sort_pll_degree')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_ft_total_cache_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "640000000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_io_capacity')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "200",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_io_capacity_max')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_large_prefix')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_lock_wait_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "50",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_log_compressed_pages')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_lru_scan_depth')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1024",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_max_dirty_pages_pct')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "75",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_max_dirty_pages_pct_lwm')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_max_purge_lag')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_max_purge_lag_delay')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_old_blocks_pct')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "37",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_old_blocks_time')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_optimize_fulltext_only')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_page_cleaners')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_purge_batch_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "300",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_purge_rseg_truncate_frequency')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "128",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_purge_threads')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_random_read_ahead')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_read_ahead_threshold')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "56",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_read_io_threads')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_rollback_segments')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "128",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_auto_recalc')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_include_delete_marked')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_method')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "nulls_equal",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_on_metadata')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_persistent')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_persistent_sample_pages')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "20",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_stats_transient_sample_pages')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_sync_array_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_table_locks')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_thread_concurrency')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_thread_sleep_delay')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "10000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/innodb_write_io_threads')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/interactive_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "28800",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/join_buffer_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "262144",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/lock_wait_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "31536000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/log_bin_trust_function_creators')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/log_queries_not_using_indexes')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/log_slow_admin_statements')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/log_slow_slave_statements')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/log_throttle_queries_not_using_indexes')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/long_query_time')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "10",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/lower_case_table_names')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_allowed_packet')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "536870912",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_connect_errors')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "100",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_connections')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "300",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_digest_length')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1024",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_error_count')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "64",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_execution_time')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_heap_table_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "16777216",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_join_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "18446744073709551615",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_length_for_sort_data')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1024",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_points_in_geometry')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "65536",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_prepared_stmt_count')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "16382",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_seeks_for_key')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4294967295",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_sort_length')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1024",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_sp_recursion_depth')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_user_connections')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/max_write_lock_count')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4294967295",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/min_examined_row_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/net_buffer_length')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "16384",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/net_read_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "120",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/net_retry_count')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "10",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/net_write_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "240",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/ngram_token_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/optimizer_prune_level')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/optimizer_search_depth')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "62",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/parser_max_mem_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "18446744073709551615",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/performance_schema')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/preload_buffer_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "32768",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_cache_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1048576",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_cache_min_res_unit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4096",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_cache_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "0",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_cache_type')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_prealloc_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8192",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_capture_interval')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "15",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_capture_mode')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "NONE",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_capture_utility_queries')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "NO",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_retention_period_in_days')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "7",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_wait_sampling_capture_mode')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "NONE",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/query_store_wait_sampling_frequency')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "30",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/range_alloc_block_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4096",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/range_optimizer_max_mem_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8388608",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/relay_log_space_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1073741824",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/server_id')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1139021442",
                "source": "user-override"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/session_track_schema')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "ON",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/session_track_state_change')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/show_compatibility_56')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/skip_show_database')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/slave_net_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "60",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/slave_parallel_workers')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "64",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/slow_query_log')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "OFF",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/sort_buffer_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "524288",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/sql_mode')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/stored_program_cache')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "256",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/table_open_cache')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "2000",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/table_open_cache_instances')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "1",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/time_zone')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "SYSTEM",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/tmp_table_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "16777216",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/transaction_alloc_block_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "8192",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/transaction_prealloc_size')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "4096",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/tx_isolation')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "REPEATABLE-READ",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/updatable_views_with_limit')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "YES",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/configurations",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/wait_timeout')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "value": "120",
                "source": "system-default"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/databases",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/information_schema')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "charset": "utf8",
                "collation": "utf8_general_ci"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/databases",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/mysql')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "charset": "latin1",
                "collation": "latin1_swedish_ci"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/databases",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/performance_schema')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "charset": "utf8",
                "collation": "utf8_general_ci"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/databases",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/sys')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "charset": "utf8",
                "collation": "utf8_general_ci"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/databases",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/wordpress')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "charset": "latin1",
                "collation": "latin1_swedish_ci"
            }
        },
        {
            "type": "Microsoft.DBforMySQL/servers/firewallRules",
            "apiVersion": "2017-12-01-preview",
            "name": "[concat(parameters('servers_netunivsqldbdemo_name'), '/allAzureIPs')]",
            "dependsOn": [
                "[resourceId('Microsoft.DBforMySQL/servers', parameters('servers_netunivsqldbdemo_name'))]"
            ],
            "properties": {
                "startIpAddress": "0.0.0.0",
                "endIpAddress": "0.0.0.0"
            }
        },
        {
            "type": "Microsoft.Web/sites",
            "apiVersion": "2016-08-01",
            "name": "[parameters('sites_netunivdockerdemo_name')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_wpdockerdemo_name'))]"
            ],
            "kind": "app,linux,container",
            "properties": {
                "enabled": true,
                "hostNameSslStates": [
                    {
                        "name": "[concat(parameters('sites_netunivdockerdemo_name'), '.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "hostType": "Standard"
                    },
                    {
                        "name": "[concat(parameters('sites_netunivdockerdemo_name'), '.scm.azurewebsites.net')]",
                        "sslState": "Disabled",
                        "hostType": "Repository"
                    }
                ],
                "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('serverfarms_wpdockerdemo_name'))]",
                "reserved": true,
                "scmSiteAlsoStopped": false,
                "clientAffinityEnabled": true,
                "clientCertEnabled": false,
                "hostNamesDisabled": false,
                "containerSize": 0,
                "dailyMemoryTimeQuota": 0,
                "httpsOnly": false
            }
        },
        {
            "type": "Microsoft.Web/sites/config",
            "apiVersion": "2016-08-01",
            "name": "[concat(parameters('sites_netunivdockerdemo_name'), '/web')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_netunivdockerdemo_name'))]"
            ],
            "properties": {
                "numberOfWorkers": 1,
                "defaultDocuments": [
                    "Default.htm",
                    "Default.html",
                    "Default.asp",
                    "index.htm",
                    "index.html",
                    "iisstart.htm",
                    "default.aspx",
                    "index.php",
                    "hostingstart.html"
                ],
                "netFrameworkVersion": "v4.0",
                "phpVersion": "",
                "pythonVersion": "",
                "nodeVersion": "",
                "linuxFxVersion": "COMPOSE|dmVyc2lvbjogJzMuMycKCnNlcnZpY2VzOgogICBkYjoKICAgICBpbWFnZTogbXlzcWw6NS43CiAgICAgdm9sdW1lczoKICAgICAgIC0gZGJfZGF0YTovdmFyL2xpYi9teXNxbAogICAgIHJlc3RhcnQ6IGFsd2F5cwogICAgIGVudmlyb25tZW50OgogICAgICAgTVlTUUxfUk9PVF9QQVNTV09SRDogc29tZXdvcmRwcmVzcwogICAgICAgTVlTUUxfREFUQUJBU0U6IHdvcmRwcmVzcwogICAgICAgTVlTUUxfVVNFUjogd29yZHByZXNzCiAgICAgICBNWVNRTF9QQVNTV09SRDogd29yZHByZXNzCgogICB3b3JkcHJlc3M6CiAgICAgZGVwZW5kc19vbjoKICAgICAgIC0gZGIKICAgICBpbWFnZTogd29yZHByZXNzOmxhdGVzdAogICAgIHBvcnRzOgogICAgICAgLSAiODAwMDo4MCIKICAgICByZXN0YXJ0OiBhbHdheXMKICAgICBlbnZpcm9ubWVudDoKICAgICAgIFdPUkRQUkVTU19EQl9IT1NUOiBkYjozMzA2CiAgICAgICBXT1JEUFJFU1NfREJfVVNFUjogd29yZHByZXNzCiAgICAgICBXT1JEUFJFU1NfREJfUEFTU1dPUkQ6IHdvcmRwcmVzcwp2b2x1bWVzOgogICAgZGJfZGF0YToK",
                "requestTracingEnabled": false,
                "remoteDebuggingEnabled": false,
                "remoteDebuggingVersion": "VS2017",
                "httpLoggingEnabled": false,
                "logsDirectorySizeLimit": 35,
                "detailedErrorLoggingEnabled": false,
                "publishingUsername": "$netunivdockerdemo",
                "scmType": "None",
                "use32BitWorkerProcess": true,
                "webSocketsEnabled": false,
                "alwaysOn": true,
                "appCommandLine": "",
                "managedPipelineMode": "Integrated",
                "virtualApplications": [
                    {
                        "virtualPath": "/",
                        "physicalPath": "site\\wwwroot",
                        "preloadEnabled": true,
                        "virtualDirectories": null
                    }
                ],
                "winAuthAdminState": 0,
                "winAuthTenantState": 0,
                "customAppPoolIdentityAdminState": false,
                "customAppPoolIdentityTenantState": false,
                "loadBalancing": "LeastRequests",
                "routingRules": [],
                "experiments": {
                    "rampUpRules": []
                },
                "autoHealEnabled": false,
                "vnetName": "",
                "siteAuthEnabled": false,
                "siteAuthSettings": {
                    "enabled": null,
                    "unauthenticatedClientAction": null,
                    "tokenStoreEnabled": null,
                    "allowedExternalRedirectUrls": null,
                    "defaultProvider": null,
                    "clientId": null,
                    "clientSecret": null,
                    "clientSecretCertificateThumbprint": null,
                    "issuer": null,
                    "allowedAudiences": null,
                    "additionalLoginParams": null,
                    "isAadAutoProvisioned": false,
                    "googleClientId": null,
                    "googleClientSecret": null,
                    "googleOAuthScopes": null,
                    "facebookAppId": null,
                    "facebookAppSecret": null,
                    "facebookOAuthScopes": null,
                    "twitterConsumerKey": null,
                    "twitterConsumerSecret": null,
                    "microsoftAccountClientId": null,
                    "microsoftAccountClientSecret": null,
                    "microsoftAccountOAuthScopes": null
                },
                "localMySqlEnabled": false,
                "http20Enabled": true,
                "minTlsVersion": "1.2",
                "ftpsState": "AllAllowed",
                "reservedInstanceCount": 0
            }
        },
        {
            "type": "Microsoft.Web/sites/hostNameBindings",
            "apiVersion": "2016-08-01",
            "name": "[concat(parameters('sites_netunivdockerdemo_name'), '/', parameters('sites_netunivdockerdemo_name'), '.azurewebsites.net')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('sites_netunivdockerdemo_name'))]"
            ],
            "properties": {
                "siteName": "netunivdockerdemo",
                "hostNameType": "Verified"
            }
        }
    ]
}
