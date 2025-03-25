async function fetchAttendance() {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('Please select a date');
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:3000/attendance/getAllStudent', { date });
        const attendanceData = response.data[0];
        const display = response.data[1].display;

        const attendanceContainer = document.getElementById('attendanceContainer');
        attendanceContainer.innerHTML = ''; // Clear previous results

        attendanceData.forEach(record => {
            const studentDiv = document.createElement('div');
            studentDiv.setAttribute('data-student-id', record.studentId);
            if (display) {
                studentDiv.innerHTML = `
                    <span>${record.name}: ${record.status}</span>
                `;
            } else {
                studentDiv.innerHTML = `
                    <span>${record.name}</span>
                    <label>
                        <input type="radio" name="status-${record.studentId}" value="Present" ${record.status === 'Present' ? 'checked' : ''}> Present
                    </label>
                    <label>
                        <input type="radio" name="status-${record.studentId}" value="Absent" ${record.status === 'Absent' ? 'checked' : ''}> Absent
                    </label>
                `;
            }
            attendanceContainer.appendChild(studentDiv);
        });

        if (!display) {
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';
            submitButton.onclick = submitAttendance;
            attendanceContainer.appendChild(submitButton);
        }
    } catch (error) {
        console.error('Error fetching attendance:', error);
        alert('Failed to fetch attendance');
    }
}

async function submitAttendance() {
    const date = document.getElementById('date').value;
    const attendanceContainer = document.getElementById('attendanceContainer');
    const studentDivs = attendanceContainer.querySelectorAll('div');
    const attendanceData = Array.from(studentDivs).map(div => {
        const studentId = div.getAttribute('data-student-id');
        const status = div.querySelector('input[type="radio"]:checked').value;
        return { studentId, status };
    });

    try {
        await axios.post('http://127.0.0.1:3000/attendance/addAttendance', { date, attendanceData });
        alert('Attendance submitted successfully');
    } catch (error) {
        console.error('Error submitting attendance:', error);
        alert('Failed to submit attendance');
    }
}