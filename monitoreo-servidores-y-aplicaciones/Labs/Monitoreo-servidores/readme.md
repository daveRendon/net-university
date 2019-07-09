## Preparación del Laboratorio


El template "windowsMultitier.js" provisiona la arquitectura de una aplicación web de front-end que se conecta a una base de datos back-end, ambas ejecutándose en Windows Server 2016.




Los datos fluyen a través del escenario de la siguiente manera:

1.Los usuarios acceden a la aplicación front-end ASP.NET a través de Azure Application Gateway.
2. Application Gateway distribuye el tráfico a las instancias de VM dentro de un conjunto de escala de máquina virtual de Azure.
3. La aplicación se conecta al clúster de Microsoft SQL Server en un nivel de back-end a través de un equilibrador de carga de Azure. Estas instancias de back-end de SQL Server están en una red virtual de Azure separada, protegida por reglas de grupo de seguridad de red que limitan el flujo de tráfico.
4. El balanceador de carga distribuye el tráfico de SQL Server a instancias de VM en otro conjunto de escala de máquina virtual.
Azure Blob Storage actúa como testigo en la nube para el clúster de SQL Server en el nivel de back-end. La conexión desde dentro de la red virtual se habilita con un punto final de servicio de red virtual para el almacenamiento de Azure.
