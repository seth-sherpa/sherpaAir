var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = (window.innerHeight*0.75) + "px";
})


function getTodaysDate() {
    var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
    var nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);
    var returnDate = nextWeek.getFullYear()+'-'+("0"+(nextWeek.getMonth()+1)).slice(-2)+'-'+("0"+nextWeek.getDate()).slice(-2)
    document.getElementById("departDate").value = today;
    document.getElementById("returnDate").value = returnDate;
}

