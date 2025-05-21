    // Fungsi untuk menampilkan detail produk
    function showProductDetail(productId, productName, productPrice, productDesc) {
        // Set data produk ke dalam slide
        document.getElementById('productTitle').textContent = productName || 'Nama Produk';
        document.getElementById('productPrice').textContent = productPrice || 'Rp 250.000';
        document.getElementById('productDescription').textContent = productDesc || 'Deskripsi produk belum tersedia';
        
        // Tampilkan slide
        document.getElementById('productDetailSlide').style.right = '0';
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk menutup detail produk
    function closeProductDetail() {
        document.getElementById('productDetailSlide').style.right = '-100%';
        document.body.style.overflow = 'auto';
    }
    
    // Fungsi untuk mengubah gambar utama
    function changeImage(src) {
        document.getElementById('mainProductImage').src = src;
    }
    
    // Fungsi untuk menambah/mengurangi kuantitas
    function increaseQuantity() {
        let input = document.getElementById('quantityInput');
        input.value = parseInt(input.value) + 1;
    }
    
    function decreaseQuantity() {
        let input = document.getElementById('quantityInput');
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    }
