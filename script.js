const API_BASE = '/users';
const userList = document.getElementById('userList');
const addUserForm = document.getElementById('addUserForm');
const errorMessage = document.getElementById('errorMessage');

// Fetch and display all users
async function fetchUsers() {
    try {
            const response = await fetch(API_BASE);
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();
            displayUsers(users);
            errorMessage.textContent = '';
    } catch (error) {
        console.error('Error fetching users:', error);
        errorMessage.textContent = 'Error loading users. Make sure the server is running.';
    }
}

// Display users in the list
function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.innerHTML = `
        <div class="user-info">
        <strong>${user.firstName} ${user.lastName}</strong> (Age: ${user.age})
            </div>
        <div>
            <button onclick="editUser(${user.id})">Edit</button>
            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </div>
            `;
         userList.appendChild(li);
    });
}

// Add new user
addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    try {      
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, age: parseInt(age) }),
            });
            if (!response.ok) throw new Error('Failed to add user');
                fetchUsers(); // Refresh the list
                addUserForm.reset();
        } catch (error) {
                console.error('Error adding user:', error);
                errorMessage.textContent = 'Error adding user.';
            }
        });

// Delete user
async function deleteUser(id) {
     if (!confirm('Are you sure you want to delete this user?')) return;
    try {
            const response = await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');
                fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error deleting user:', error);
            errorMessage.textContent = 'Error deleting user.';
        }
    }

        // Edit user (simple prompt-based edit)
        async function editUser(id) {
            const newFirstName = prompt('Enter new first name:');
            const newLastName = prompt('Enter new last name:');
            const newAge = prompt('Enter new age:');

            if (!newFirstName || !newLastName || !newAge) return;

            try {
                const response = await fetch(`${API_BASE}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        age: parseInt(newAge)
                    }),
                });
                if (!response.ok) throw new Error('Failed to update user');
                fetchUsers(); // Refresh the list
            } catch (error) {
                console.error('Error updating user:', error);
                errorMessage.textContent = 'Error updating user.';
            }
        }

// Load users on page load
fetchUsers();