document.addEventListener('DOMContentLoaded', () => {
    // Handling Vertical Tabs in Section 2
    const vTabs = document.querySelectorAll('.v-tab');

    // Image URLs for each tab
    const tabImages = [
        "https://i.pinimg.com/736x/06/15/3c/06153cecd727216f4d9e4e3c5c94c495.jpg", // Quán cà phê
        "https://i.pinimg.com/1200x/0c/be/28/0cbe2871d906978f06ca091df62686f0.jpg", // Quán ăn / nhà hàng
        "https://i.pinimg.com/1200x/d3/56/1b/d3561b70add9c813f0882e796238e86c.jpg", // Quán bar / lounge / pub
        "https://i.pinimg.com/736x/ee/a2/35/eea2351a6935f639891e16dceb02accd.jpg", // Quán ăn di động
        "https://i.pinimg.com/736x/fd/59/13/fd591395b8dda92e151ada2bb61aa5b0.jpg", // Tiệm trà sữa
        "https://i.pinimg.com/736x/d6/76/04/d676047a4738a91883f279dcd9fbcdaf.jpg"  // Tiệm bánh
    ];

    const visualImage = document.getElementById('tab-image');
    const mobileVTabsToggle = document.querySelector('.mobile-v-tabs-toggle');
    const verticalTabsContainer = document.querySelector('.vertical-tabs');

    if (mobileVTabsToggle && verticalTabsContainer) {
        // Create wrapper around toggle
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.width = '100%';
        wrapper.style.zIndex = '50';
        mobileVTabsToggle.parentNode.insertBefore(wrapper, mobileVTabsToggle);
        wrapper.appendChild(mobileVTabsToggle);

        // Create dropdown list
        const dropdownList = document.createElement('div');
        dropdownList.className = 'mobile-v-tabs-dropdown-list';

        vTabs.forEach((tab, index) => {
            const item = document.createElement('div');
            item.className = 'mobile-v-tabs-dropdown-item';
            const heading = tab.querySelector('h3');
            if (heading) {
                item.textContent = heading.textContent;
            }
            if (tab.classList.contains('active')) {
                item.classList.add('active');
            }

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                tab.click();

                dropdownList.classList.remove('show');
                mobileVTabsToggle.classList.remove('open');

                dropdownList.querySelectorAll('.mobile-v-tabs-dropdown-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });

            dropdownList.appendChild(item);
        });

        wrapper.appendChild(dropdownList);

        mobileVTabsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownList.classList.toggle('show');
            mobileVTabsToggle.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            dropdownList.classList.remove('show');
            mobileVTabsToggle.classList.remove('open');
        });
    }

    vTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {

            // Remove active class from all tabs
            vTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Update mobile label
            const mobileLabel = document.getElementById('mobile-v-tabs-label');
            if (mobileLabel) {
                const heading = tab.querySelector('h3');
                if (heading) mobileLabel.textContent = heading.textContent;
            }

            // Update the image source with a smooth fade
            if (visualImage && tabImages[index]) {
                visualImage.style.opacity = 0;
                setTimeout(() => {
                    visualImage.src = tabImages[index];
                    visualImage.style.opacity = 1;
                }, 200);
            }
        });
    });

    // Handling Main Horizontal Tabs
    const mainTabs = document.querySelectorAll('.main-tab-btn');
    const activePill = document.querySelector('.active-pill');

    function updatePillPosition(tab) {
        if (activePill && tab) {
            activePill.style.width = tab.offsetWidth + 'px';
            activePill.style.left = tab.offsetLeft + 'px';
            activePill.style.top = tab.offsetTop + 'px';
        }
    }

    // Initialize pill position on load
    const initialActiveMainTab = document.querySelector('.main-tab-btn.active');
    // Use a tiny timeout to ensure styles are applied and offsetLeft is correct
    setTimeout(() => {
        updatePillPosition(initialActiveMainTab);
    }, 50);

    // Update pill position on window resize
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.main-tab-btn.active');
        updatePillPosition(currentActive);
    });

    const mainTabsContainer = document.querySelector('.main-tabs');
    
    if (window.innerWidth <= 991 && mainTabsContainer) {
        const mainDropdownList = document.createElement('div');
        mainDropdownList.className = 'main-tabs-dropdown-list';
        
        mainTabs.forEach(tab => {
            const item = document.createElement('div');
            item.className = 'main-tabs-dropdown-item';
            item.innerHTML = tab.innerHTML;
            
            if (tab.classList.contains('active')) {
                item.classList.add('active');
            }
            
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                tab.click();
                mainDropdownList.classList.remove('show');
                mainDropdownList.querySelectorAll('.main-tabs-dropdown-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
            
            mainDropdownList.appendChild(item);
        });
        
        mainTabsContainer.appendChild(mainDropdownList);
    }
    
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                const tabsContainer = tab.closest('.main-tabs');
                const dropdownList = tabsContainer.querySelector('.main-tabs-dropdown-list');
                if (tab.classList.contains('active')) {
                    if (dropdownList) {
                        dropdownList.classList.toggle('show');
                    }
                    return;
                } else {
                    if (dropdownList) dropdownList.classList.remove('show');
                }
            }

            mainTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updatePillPosition(tab);
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-tabs')) {
            const mainDropdownList = document.querySelector('.main-tabs-dropdown-list');
            if (mainDropdownList) mainDropdownList.classList.remove('show');
        }
    });
});
