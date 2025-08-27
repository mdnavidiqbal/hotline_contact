 // State
    let likes = 0;
    let coins = 100;
    let copies = 0;
    let history = [];

    // DOM
    const likeCount = document.getElementById("likeCount");
    const coinCount = document.getElementById("coinCount");
    const copyCount = document.getElementById("copyCount");
    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistory");

    // Heart
    document.querySelectorAll(".heartBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        likes++;
        likeCount.textContent = likes;
      });
    });

    // Copy
    document.querySelectorAll(".copyBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const number = btn.dataset.number;
        try {
          await navigator.clipboard.writeText(number);
          copies++;
          copyCount.textContent = copies;
          alert(`নম্বর কপি হয়েছে : ${number}`);
        } catch {
          alert("Copy failed!");
        }
      });
    });

    // Call
    document.querySelectorAll(".callBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const number = btn.dataset.number;
        const name = btn.dataset.name;

        if (coins < 20) {
          alert("আপনার পর্যাপ্ত কয়েন নেই,প্রত্যেকটি কলের জন্য ২০ টি কয়েন প্রয়োজন.");
          return;
        }

        coins -= 20;
        coinCount.textContent = coins;
        alert(`Calling ${name} ${number}...`);

        const time = new Date().toLocaleTimeString();
        history.unshift({name, number, time});
        renderHistory();
      });
    });

    // Render History
    function renderHistory(){
      historyList.innerHTML = "";
      history.forEach(item => {
        const div = document.createElement("div");
        div.className = "flex justify-between bg-gray-100 rounded p-2";
        div.innerHTML = `<div><b>${item.name}</b><br><span class="text-xs">${item.number}</span></div>
                         <span class="text-xs text-gray-500">${item.time}</span>`;
        historyList.appendChild(div);
      });
      if(history.length === 0) historyList.innerHTML = "<p>No calls yet.</p>";
    }

    // Clear history
    clearHistoryBtn.addEventListener("click", () => {
      history = [];
      renderHistory();
    });