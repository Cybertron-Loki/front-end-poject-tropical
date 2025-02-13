// 假设有一个台风数据数组
const typhoons = [
    { name: "Typhoon A", city: "City1", date: "2023-01-15" },
    { name: "Typhoon B", city: "City2", date: "2023-01-16" },
    { name: "Typhoon C", city: "City1", date: "2023-01-15" },
    // 更多台风数据...
];

// 查询台风
function queryTyphoon() {
    const city = document.getElementById("city").value;
    const date = document.getElementById("date").value;
    const resultDiv = document.getElementById("result");

    // 清空结果
    resultDiv.innerHTML = "";

    const filteredTyphoons = typhoons.filter(typhoon =>
        typhoon.city.toLowerCase() === city.toLowerCase() && typhoon.date === date
    );

    if (filteredTyphoons.length > 0) {
        filteredTyphoons.forEach(typhoon => {
            const p = document.createElement("p");
            p.textContent = typhoon.name;
            resultDiv.appendChild(p);
        });
    } else {
        resultDiv.textContent = "No typhoon found.";
    }
}

// 绑定事件
document.getElementById("submit").addEventListener("click", queryTyphoon);
document.getElementById("close").addEventListener("click", () => {
    document.getElementById("city").value = "";
    document.getElementById("date").value = "";
    document.getElementById("result").innerHTML = "";
});