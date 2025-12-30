      // Car data array with all available models
        const cars = [
            {
                id: 1,
                name: 'Toyota Alphard',
                price: 1200000000,
                image: 'images/Alphard.jpg',
                type: 'MPV',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'White Pearl',
                available: 5
            },
            {
                id: 2,
                name: 'Mercedes-AMG A45 S',
                price: 1850000000,
                image: 'images/AMG45.jpg',
                type: 'Hot Hatch',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Black',
                available: 3
            },
            {
                id: 3,
                name: 'BMW i7',
                price: 2500000000,
                image: 'images/BMW i7.jpg',
                type: 'Sedan Listrik',
                transmission: 'Automatic',
                fuel: 'Listrik',
                year: 2023,
                color: 'Black Sapphire',
                available: 2
            },
            {
                id: 4,
                name: 'Subaru BRZ',
                price: 985000000,
                image: 'images/BRZ.jpg',
                type: 'Coupe',
                transmission: 'Manual',
                fuel: 'Bensin',
                year: 2023,
                color: 'WR Blue Pearl',
                available: 1
            },
            {
                id: 5,
                name: 'BYD Atto 3',
                price: 750000000,
                image: 'images/BYD.jpg',
                type: 'Electric SUV',
                transmission: 'Automatic',
                fuel: 'Listrik',
                year: 2023,
                color: 'Red',
                available: 4
            },
            {
                id: 6,
                name: 'Toyota Fortuner',
                price: 675000000,
                image: 'images/Fortuner.jpg',
                type: 'SUV',
                transmission: 'Automatic',
                fuel: 'Diesel',
                year: 2023,
                color: 'Gray Metallic',
                available: 6
            },
            {
                id: 7,
                name: 'Mitsubishi Pajero Sport',
                price: 720000000,
                image: 'images/Pajero.jpg',
                type: 'SUV',
                transmission: 'Automatic',
                fuel: 'Diesel',
                year: 2023,
                color: 'White Diamond',
                available: 3
            },
            {
                id: 8,
                name: 'Hyundai Palisade',
                price: 1250000000,
                image: 'images/Palisade.jpg',
                type: 'SUV Premium',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Sierra Burgundy',
                available: 2
            },
            {
                id: 9,
                name: 'Toyota Vellfire',
                price: 1350000000,
                image: 'images/Toyota Vellfire.jpg',
                type: 'MPV Premium',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Black',
                available: 4
            },
            {
                id: 10,
                name: 'BMW M4 Competition',
                price: 2850000000,
                image: 'images/bmw-m4.jpeg',
                type: 'Coupe Sport',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Sao Paulo Yellow',
                available: 1
            },
            {
                id: 11,
                name: 'Honda Civic Type R',
                price: 1250000000,
                image: 'images/civic-type-r.jpeg',
                type: 'Hot Hatch',
                transmission: 'Manual',
                fuel: 'Bensin',
                year: 2023,
                color: 'Championship White',
                available: 2
            },
            {
                id: 12,
                name: 'Toyota GR86',
                price: 950000000,
                image: 'images/gr86.jpg',
                type: 'Sports Car',
                transmission: 'Manual',
                fuel: 'Bensin',
                year: 2023,
                color: 'Trueno Blue',
                available: 2
            },
            {
                id: 13,
                name: 'Nissan GT-R Nismo',
                price: 4500000000,
                image: 'images/gtr.jpeg',
                type: 'Supercar',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Bayside Blue',
                available: 1
            },
            {
                id: 14,
                name: 'Hyundai IONIQ 5',
                price: 850000000,
                image: 'images/ioniq5.jpeg',
                type: 'Electric Crossover',
                transmission: 'Automatic',
                fuel: 'Listrik',
                year: 2023,
                color: 'Digital Teal',
                available: 3
            },
            {
                id: 15,
                name: 'Lexus LM 350',
                price: 1850000000,
                image: 'images/lexus-lm.jpeg',
                type: 'MPV Luxury',
                transmission: 'Automatic',
                fuel: 'Bensin',
                year: 2023,
                color: 'Sonic Quartz',
                available: 2
            },
            {
                id: 16,
                name: 'Toyota Supra MK4',
                price: 1200000000,
                image: 'images/supra-mk4.jpeg',
                type: 'Sports Car',
                transmission: 'Manual',
                fuel: 'Bensin',
                year: 1998,
                color: 'Super Red',
                available: 1
            }
        ];
        let selectedCar = null;
        let currentStep = 1;

        /* ===============================
           ELEMENT
        ================================ */
        const carSelection = document.getElementById('carSelection');
        const carCount = document.getElementById('carCount');
        const quickSelect = document.getElementById('quickSelectCar');
        const carSearch = document.getElementById('carSearch');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const steps = document.querySelectorAll('.step');

        /* ===============================
           HELPER
        ================================ */
        const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');

        /* ===============================
           RENDER MOBIL
        ================================ */
        function renderCars(filter = 'all', search = '') {
            const filtered = cars.filter(c =>
                (filter === 'all' || c.type === filter) &&
                c.name.toLowerCase().includes(search.toLowerCase())
            );

            carSelection.innerHTML = filtered.map(c => `
    <div class="car-card cursor-pointer ${selectedCar?.id === c.id ? 'selected' : ''}" data-id="${c.id}">
      <div class="relative">
        <img src="${c.image}" class="car-image">
        <span class="car-badge">${c.available} tersedia</span>
      </div>
      <div class="p-4">
        <h3 class="font-bold">${c.name}</h3>
        <p class="car-price">${rupiah(c.price)}</p>
        <div class="car-specs"><span>${c.type}</span></div>
      </div>
    </div>
  `).join('');

            carCount.textContent = `Menampilkan ${filtered.length} dari ${cars.length} mobil`;

            document.querySelectorAll('.car-card').forEach(card => {
                card.onclick = () => {
                    document.querySelectorAll('.car-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    selectedCar = cars.find(c => c.id == card.dataset.id);
                    quickSelect.value = selectedCar.id;
                    updateSummary();
                };
            });
        }

        /* ===============================
           QUICK SELECT
        ================================ */
        quickSelect.innerHTML = '<option value="">-- Pilih Mobil --</option>' +
            cars.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

        quickSelect.onchange = () => {
            selectedCar = cars.find(c => c.id == quickSelect.value);
            updateSummary();
            renderCars(
                document.querySelector('.filter-btn.active').dataset.filter,
                carSearch.value
            );
        };

        /* ===============================
           FILTER & SEARCH
        ================================ */
        filterBtns.forEach(btn => {
            btn.onclick = () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderCars(btn.dataset.filter, carSearch.value);
            };
        });
        carSearch.oninput = () => {
            renderCars(document.querySelector('.filter-btn.active').dataset.filter, carSearch.value);
        };

        /* ===============================
           STEP CONTROL
        ================================ */
        function showStep(step) {
            // TAMPILKAN STEP KONTEN
            steps.forEach(s => s.classList.remove('active'));
            document.getElementById('step' + step).classList.add('active');

            // UPDATE STEP BULATAN
            document.querySelectorAll('.step-indicator').forEach(indicator => {
                const s = parseInt(indicator.dataset.step);

                if (s <= step) {
                    indicator.classList.remove('bg-gray-200', 'text-gray-500');
                    indicator.classList.add('bg-primary', 'text-white');
                } else {
                    indicator.classList.add('bg-gray-200', 'text-gray-500');
                    indicator.classList.remove('bg-primary', 'text-white');
                }
            });

            // UPDATE PROGRESS BAR
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach((bar, index) => {
                bar.style.width = step > index + 1 ? '100%' : '0%';
                bar.classList.toggle('bg-primary', step > index + 1);
            });
        }

        document.querySelectorAll('.next-step').forEach(btn => {
            btn.onclick = () => {

                // STEP 1 VALIDATION
                if (currentStep === 1 && !selectedCar) {
                    alert('Silakan pilih mobil!');
                    return;
                }

                // STEP 2 VALIDATION
                if (currentStep === 2) {
                    const requiredFields = ['fullName', 'email', 'phone', 'idCard', 'address'];
                    for (let id of requiredFields) {
                        const el = document.getElementById(id);
                        if (!el.value.trim()) {
                            alert('Lengkapi data pribadi terlebih dahulu!');
                            el.focus();
                            return;
                        }
                    }
                }

                currentStep++;
                showStep(currentStep);
            };
        });


        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.onclick = () => {
                currentStep--;
                showStep(currentStep);
            };
        });

        /* ===============================
           SUMMARY
        ================================ */
        function updateSummary() {
            if (!selectedCar) return;
            document.getElementById('selectedCarName').textContent = selectedCar.name;
            document.getElementById('selectedCarPrice').textContent = rupiah(selectedCar.price);
            document.getElementById('totalPrice').textContent = rupiah(selectedCar.price);
        }

        /* ===============================
           SUBMIT
        ================================ */
        document.getElementById('purchaseForm').addEventListener('submit', function (e) {
            e.preventDefault();

            if (!selectedCar) return alert('Pilih mobil');

            const payment = document.querySelector('input[name="paymentMethod"]:checked');
            if (!payment) return alert('Pilih metode pembayaran');

            if (!document.getElementById('terms').checked)
                return alert('Setujui syarat');

            const orderId = 'AUR-' + Date.now();

            // ISI STRUK
            document.getElementById('printOrderNumber').textContent = orderId;
            document.getElementById('printDate').textContent = new Date().toLocaleString('id-ID');

            document.getElementById('printName').textContent = fullName.value;
            document.getElementById('printEmail').textContent = email.value;
            document.getElementById('printPhone').textContent = phone.value;
            document.getElementById('printAddress').textContent = address.value;

            document.getElementById('printCarName').textContent = selectedCar.name;
            document.getElementById('printCarPrice').textContent = rupiah(selectedCar.price);
            document.getElementById('printPayment').textContent = payment.value;
            document.getElementById('printTotal').textContent = rupiah(selectedCar.price);


            // TAMPILKAN PRINT AREA
            const printArea = document.getElementById('printArea');
            printArea.style.display = 'block';

            // PAKSA BROWSER REPAINT
            printArea.offsetHeight;

            // SEMBUNYIKAN MODAL
            document.getElementById('successModal').classList.add('hidden');

            // CETAK
            window.print();

            // BALIKKAN SETELAH PRINT
            setTimeout(() => {
                printArea.style.display = 'none';
            }, 500);
        });




        /* ===============================
           INIT
        ================================ */
        renderCars();
        showStep(1);

        document.getElementById('printReceipt').onclick = () => {
            window.print();
        };

  