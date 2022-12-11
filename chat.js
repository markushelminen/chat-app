(function () {
        const sendBtn = document.querySelector('#send');
        const messages = document.querySelector('#messages');
        const input = document.querySelector('#messageInput');

        let client;

        function showMessage(message) {
            console.log(message);
            messages.textContent += `\n\n${message}`;
            messages.scrollTop = messages.scrollHeight;
            input.value = ''
        }

        function init() {
            if (client) {
                client.onerror = client.onopen = client.onclose = null;
                client.close();
            }

            client = new WebSocket('ws://localhost:6969');
            client.onopen = () => {
                console.log('Connection opened!');
            }
            client.onmessage = async function getData(data) {
                const message = await data.data.text();
                showMessage(message);
            }
            client.onclose = function () {
                client = null;
            }
        }

        sendBtn.onclick = function () {
            if (!client) {
                showMessage("No WebSocket connection.");
                return;
            }
            console.log(input.value);
            client.send(input.value);
            showMessage(input.value);
        }

        init();
    })();