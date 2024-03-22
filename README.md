# Prometheus and Grafana Monitoring
Prometheus and Grafana setup with Node exporter and smtp mail alerting. Nice!
## Technologies
<div align="left">
    <img src="https://skillicons.dev/icons?i=docker,prometheus,grafana" />
</div>

1. Docker
2. Prometheus
3. Grafana

## How to run
1. Fork or clone this repo
```
git clone https://github.com/azconcept-droid/prometheus-grafana.git
```
2. cd into this directory
```
cd prometheus-grafana
```
3. Install docker
```
bash install-docker
```
4. Run 
```
sudo docker compose up -d
```
5. Check if the containers are running
```
sudo docker ps
```
6. open any of the links in your browser:
    prometheus 
    ```
    <server-ip>:9090
    ```
    node exporter 
    ```
    <server-ip>:9100
    ``` 
    alertmanager 
    ```
    <server-ip>:9093
    ``` 
    grafana 
    ```
    <server-ip>:3000
    ``` 
    mail inbox 
    ```
    <server-ip>:1080
    ```
