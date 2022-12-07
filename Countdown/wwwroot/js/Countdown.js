async function StartDateAPI() {
    const result = await $.ajax({
        url: "/api/GetStartDate",
        type: 'GET',
    });

    return result;
}

async function GetStartDate() {
    var res = await StartDateAPI();
    GetCountDown(res.startDate);
}

GetStartDate();

function GetCountDown(startDate) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(startDate),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "12/08/",
        endDate = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;

    if (today > endDate) {
        endDate = dayMonth + nextYear;
    }

    const countDown = new Date(endDate).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            if (distance < 0) {
                document.getElementById("headline").innerText = "Timer Is Done!";
                document.getElementById("countdown").style.display = "none";
                clearInterval(x);

                $.ajax({
                    url: '/api/CountDownEnds',
                    type: 'POST',
                    success: function () {
                        alert('Load was performed.');
                    }
                });
            }
        }, 0)
};
