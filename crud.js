let fetchdata = async () => {
    let url = 'http://localhost:3000/TicketDetails';
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();
    console.log(data);

    let display = document.querySelector('#crudd');
    display.innerHTML = ''; 

    data.map((e) => {
        display.innerHTML += `
        <div class="card">
            <h2>Name: <span>${e.name}</span></h2>
            <p>Email: <span>${e.Email}</span></p>
            <p>seat: <span>${e.seat}</span></p>
            <p>Tickets: <span>${e.Tickets}</span></p>
            <p>Date: <span>${e.Date}</span></p>
            <p>Time: <span>${e.time}</span></p>
        </div>
        `;
    });
};
