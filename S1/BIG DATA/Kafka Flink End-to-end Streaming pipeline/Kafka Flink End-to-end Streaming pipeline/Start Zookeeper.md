* **Start Zookeeper**
* **Start Kafka Broker**
* **Create Kafka Topic**

bin/kafka-topics.sh --create \\

\--topic my-topic-test \\

\--bootstrap-server localhost:9092 \\

\--partitions 1 \\

\--replication-factor 1

**Check :** bin/kafka-topics.sh --list --bootstrap-server localhost:9092

* **Start Elasticsearch**
* **Create Elasticsearch Index** (curl -X PUT "localhost:9200/twitter")
* **Start Flink Cluster**
* **Activate Python Environment**

cd \~/Documents/Master/BD/TD\_TP/App

source .venv38/bin/activate

export PYFLINK\_PYTHON=$(which python)

* **Run Your Job**

flink run -py flink\_kafka\_to\_es.py \\

  -pyexec /home/vboxuser/Documents/Master/BD/TD\_TP/App/flink\_env/bin/python

