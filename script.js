
const firebaseConfig = {
    apiKey: "AIzaSyD7IzWl7Y9eBvl3aIYF1aA9CWRxfoZQOl0",
    authDomain: "fortmonth-c1bb4.firebaseapp.com",
    databaseURL: "https://fortmonth-c1bb4-default-rtdb.firebaseio.com",
    projectId: "fortmonth-c1bb4",
    storageBucket: "fortmonth-c1bb4.appspot.com",
    messagingSenderId: "765408862368",
    appId: "1:765408862368:web:ce9b59a0f08d41cf99e9c5",
    measurementId: "G-YXTWBDBKWY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function sendMessage() {
    const messageInput = document.getElementById('specialMessage');
    const message = messageInput.value;
    
    if (message) {
        // ส่งข้อความไปยังฐานข้อมูล
        database.ref('messages').push().set({
            message: message
        });
        messageInput.value = '';
        displayMessages();
    } else {
        alert("กรุณาเขียนข้อความก่อนส่ง!");
    }
}
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.innerText += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.innerText = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.innerText;
    
    try {
        const result = eval(expression);
        if (result === 24) {
            // ซ่อนหน้าปัจจุบัน
            document.body.style.display = 'none';
            // แสดงหน้าใหม่
            const newWindow = window.open('', '_self');
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>forthMonth</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <div class="container">
                        <header>
                            <h1>สุขสันต์วันครบรอบ 4 เดือนนะคะ😊</h1>
                            <p>เดินทางมาถึงเดือนที่4แล้วนะคะ ถึงช่วงนี้เค้าจะไม่ค่อยแสดงออก แต่เค้ารักบี๋มากเลยน้าา เค้าอยากมีบี๋แบบนี้ในทุกๆวันตลอดไปเลยนะคะ เค้าอยากเติบโตไปพร้อมเบบี๋ คอยมอบความอบอุ่นให้กัน อาจจะมีทะเลาะกันบ้าง แต่เราจะต้องผ่านมันไปได้แน่นอนนะคะ มาพยายามไปด้วยกันนะะ❤️</p>
                        </header>
                        <div class="message">
                            <h2>Text box</h2>
                            <textarea id="specialMessage" placeholder="ถ้ามีอะไรอยากบอกเค้าให้พิมพ์ตรงนี้แล้วกดส่งนะคะ..."></textarea>
                            <button onclick="showMessage()">ส่งข้อความ</button>
                            <p id="displayMessage" class="display-message"></p>
                        </div>
                    </div>
                </body>
                </html>
            `);
        } else {
            display.innerText = result;
        }
    } catch {
        display.innerText = 'Error';
    }
}


function showMessage() {
    const messageInput = document.getElementById('specialMessage');
    const displayMessage = document.getElementById('displayMessage');
    displayMessage.innerText = messageInput.value ? messageInput.value : "กรุณาเขียนข้อความก่อนส่ง!";
}

function sendMessage() {
    const messageInput = document.getElementById('specialMessage');
    const message = messageInput.value;
    
    if (message) {
        // ส่งข้อความไปยังฐานข้อมูล
        database.ref('messages').push().set({
            message: message
        });
        messageInput.value = '';
        displayMessages();
    } else {
        alert("กรุณาเขียนข้อความก่อนส่ง!");
    }
}

// ฟังก์ชันเพื่อแสดงข้อความทั้งหมดจากฐานข้อมูล
function displayMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    // อ่านข้อความจากฐานข้อมูล
    database.ref('messages').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const messageElement = document.createElement('p');
            messageElement.innerText = messageData.message;
            messagesList.appendChild(messageElement);
        });
    });
}

// เรียกใช้ฟังก์ชันเพื่อแสดงข้อความเมื่อต้องโหลดหน้า
displayMessages();