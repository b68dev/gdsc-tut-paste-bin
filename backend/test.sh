# cat package.json

curl --location 'http://localhost:3000/p/a' \
--header 'Content-Type: application/json' \
--data '{
    "content": "I am building a PasteBin"
}' | jq