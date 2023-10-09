class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
        minutes: root.querySelector(".timer--part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset"),
    };
this.interval = null;
this.remainingSeconds = 0;
this.updateInterfaceTime();
this.updateInterfaceControls();

this.el.control.addEventListener("click", () => {
if(this.interval === null) {
 this.start();
} else {
    this.stop();
}
});
this.el.reset.addEventListener("click", () => {
 const inputMinutes = prompt("enter a number of minutes:");
 if (inputMinutes < 60) {
this.stop();
this.remainingSeconds = inputMinutes * 60;
this.updateInterfaceTime();
 }

});

 }
    updateInterfaceTime() {
         const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
   
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
updateInterfaceControls() {
       if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer--btn--start");
      this.el.control.classList.remove("timer--btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer--btn--stop");
      this.el.control.classList.remove("timer--btn--start");
    
    }


}
   start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }


     stop() {
          clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();



     }
    static getHTML() {
    return `
<span class="timer--part timer--part--minutes">00</span>
			<span class="timer--part">:</span>
			<span class="timer--part timer__part--seconds">00</span>
			<button type="button" class="timer--btn timer__btn--control timer--btn--start">
				<span class="material-icons">play_arrow</span>
			<button type="button" class="timer--btn timer__btn--reset">
				<span class="material-icons">timer</span>
			</button>
		`;
  }
}
new Timer(
	document.querySelector(".timer")
);
