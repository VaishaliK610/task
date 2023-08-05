  const facilitiesConfig = [
      { name: "Clubhouse", slot1: { startTime: 10, endTime: 16, rate: 100 }, slot2: { startTime: 16, endTime: 22, rate: 500 } },
      { name: "Tennis Court", rate: 50 }
    ];

    const bookings = [];
    console.log(bookings);
    function isSlotBooked(facility, date, startTime, endTime) {
        console.log(bookings);
      return bookings.some(booking =>
        booking.facility === facility &&
        booking.date === date &&
        (startTime >= booking.startTime && startTime < booking.endTime || endTime > booking.startTime && endTime <= booking.endTime)
      );
    }
  
    function bookFacility() {
      const selectedFacility = document.getElementById("facility").value;
      const date = document.getElementById("date").value;
      const startTime = document.getElementById("startTime").value;
      const endTime = document.getElementById("endTime").value;

      if (!selectedFacility || !date || !startTime || !endTime) {
        document.getElementById("output").innerText = "Please fill in all the details.";
        return;
      }

      const config = facilitiesConfig.find(f => f.name === selectedFacility);
      
      if (!config) {
        document.getElementById("output").innerText = "Booking Failed, Facility not found.";
        return;
      }

      const startHour = parseInt(startTime.split(":")[0]); 
      const endHour = parseInt(endTime.split(":")[0]);
      console.log(startHour);
      console.log(endHour);

      if (isNaN(startHour) || isNaN(endHour) || startHour >= endHour) {
        document.getElementById("output").innerText = "Invalid Time Range.";
        return;
      }

      if (isSlotBooked(selectedFacility, date, startHour, endHour)) {
        document.getElementById("output").innerText = "Booking Failed, Already Booked.";
        return;
      }

      let totalAmount = 0;

      if (config.slot1 && startHour >= config.slot1.startTime && endHour <= config.slot1.endTime) {
        totalAmount += (endHour - startHour) * config.slot1.rate;
        console.log(totalAmount);
      } else if (config.slot2 && startHour >= config.slot2.startTime && endHour <= config.slot2.endTime) {
        totalAmount += (endHour - startHour) * config.slot2.rate;
        console.log(totalAmount);

      }

      if (config.rate) {
        totalAmount += (endHour - startHour) * config.rate;
        console.log(totalAmount);

      }
       if (totalAmount ===0)
       {
        document.getElementById("output").innerText = `Invalid Time Range.`;
        return

       }
      bookings.push({ facility: selectedFacility, date, startTime: startHour, endTime: endHour, amount: totalAmount });
      document.getElementById("output").innerText = `Booked, Rs. ${totalAmount}`;
      console.log(totalAmount);   
    }
  