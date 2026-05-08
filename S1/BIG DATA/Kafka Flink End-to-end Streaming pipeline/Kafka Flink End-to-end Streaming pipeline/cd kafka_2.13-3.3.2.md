cd kafka\_2.13-3.3.2

bin/zookeeper-server-start.sh config/zookeeper.properties

bin/kafka-server-start.sh config/server.properties

cd \~/Downloads/elasticsearch

./bin/elasticsearch

cd \~/Downloads/kibana

./bin/kibana

start-all.sh

start-cluster.sh



cd \~/Documents/Master/BD/TD\_TP/App

source .venv38/bin/activate

python -m uvicorn twitter\_api:app --reload --host 0.0.0.0 --port 8000

python kafka\_tweets\_producer.py

python Kafka\_tweets\_consumer.py

python kafka\_flink\_elasticsearch\_streaming.py

