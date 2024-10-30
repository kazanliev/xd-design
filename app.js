document.addEventListener('DOMContentLoaded', () => {
    const postalCodeInput = document.getElementById('postalCode');
    const cityInput = document.getElementById('city');
    const suggestionsContainer = document.getElementById('suggestions');

    postalCodeInput.addEventListener('input', async () => {
        const postalCode = postalCodeInput.value;

        // If the postal code has exactly 5 characters, fetch a suggestion for the city
        if (postalCode.length === 5) {
            try {
                const response = await fetch(`https://api.zippopotam.us/de/${postalCode}`);
                if (!response.ok) {
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';
                    return;
                }
                const data = await response.json();
                const city = data.places[0]['place name'];
                const suggestions = `<div class="suggestion-item">${postalCode}, ${city}</div>`;

                suggestionsContainer.innerHTML = suggestions;
                suggestionsContainer.style.display = 'block';

                // If clicked, fill the city input with the suggestion
                const suggestionItems = document.querySelectorAll('.suggestion-item');
                suggestionItems.forEach(item => {
                    item.addEventListener('click', () => {
                        cityInput.value = city;
                        suggestionsContainer.innerHTML = '';
                        suggestionsContainer.style.display = 'none';
                    });
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });

    // Hide the suggestion when clicking outside of the suggestion box
    document.addEventListener('click', (event) => {
        if (!postalCodeInput.contains(event.target) && !cityInput.contains(event.target)) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });


});



