# Contenido para habilitar Azure Monitor para contenedores Docker

Para el template: multiapp-container-wordpress-docker.js, modificar los parámetros debajo antes de provisionar: 

1. website name
1. mySQL name


Habilitar Grafana en el Contenedor: 

```javascript
docker run -d --name=grafana -p 3000:3000 -e "GF_INSTALL_PLUGINS=grafana-azure-data-explorer-datasource,natel-plotly-panel" grafana/grafana:latest

```

