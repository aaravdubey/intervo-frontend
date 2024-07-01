function scheduleInterviews(startRange, endRange, candidates) {
  // Helper function to add minutes to a Date object
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  // Helper function to format a Date object as HH:mm
  function formatTime(date) {
    return date.toTimeString().slice(0, 5);
  }

  const interviewDuration = 15; // 15 minutes interview
  const bufferDuration = 5; // 5 minutes buffer
  const totalDuration = interviewDuration + bufferDuration;

  // Convert time ranges to Date objects for today
  const today = new Date();
  const startTime = new Date(today);
  const [startHour, startMinute] = startRange.split(':').map(Number);
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(today);
  const [endHour, endMinute] = endRange.split(':').map(Number);
  endTime.setHours(endHour, endMinute, 0, 0);

  const schedules = [];
  let currentTime = startTime;
  let dayCount = 0;

  candidates.forEach((candidate, index) => {
    if (currentTime > endTime) {
      // If the current time exceeds the end time, move to the next day
      dayCount++;
      currentTime = new Date(today);
      currentTime.setDate(currentTime.getDate() + dayCount);
      currentTime.setHours(startHour, startMinute, 0, 0);
    }

    schedules.push({
      candidate,
      start: formatTime(currentTime),
      end: formatTime(addMinutes(currentTime, interviewDuration))
    });

    // Move to the next time slot
    currentTime = addMinutes(currentTime, totalDuration);
  });

  return schedules;
}

// Example usage
const startRange = '09:00';
const endRange = '17:00';
const candidates = Array.from({ length: 20 }, (_, i) => `Candidate ${i + 1}`);

const schedules = scheduleInterviews(startRange, endRange, candidates);
console.log(schedules);
