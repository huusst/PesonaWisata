import React, { useState, useEffect } from 'react';

const Slider = () => {
    // Daftar data card slider
    const cardData = [
        { "id": 1, "title": 'Card 1', "imageUrl": 'https://placeimg.com/200/200/any' },
        { "id": 2, "title": 'Card 2', "imageUrl": 'https://placeimg.com/200/200/tech' },
        { "id": 3, "title": 'Card 3', "imageUrl": 'https://placeimg.com/200/200/nature' },
        { "id": 4, "title": 'Card 4', "imageUrl": 'https://placeimg.com/200/200/arch' },
        { "id": 5, "title": 'Card 2', "imageUrl": 'https://placeimg.com/200/200/tech' },
        { "id": 6, "title": 'Card 3', "imageUrl": 'https://placeimg.com/200/200/nature' },
        { "id": 7, "title": 'Card 4', "imageUrl": 'https://placeimg.com/200/200/arch' },
        { "id": 8, "title": 'Card 2', "imageUrl": 'https://placeimg.com/200/200/tech' },
        { "id": 9, "title": 'Card 3', "imageUrl": 'https://placeimg.com/200/200/nature' },
        { "id": 10, "title": 'Card 4', "imageUrl": 'https://placeimg.com/200/200/arch' },
        { "id": 11, "title": 'Card 5', "imageUrl": 'https://placeimg.com/200/200/animals' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasBeenVisible, setHasBeenVisible] = useState(false); // Variabel status tambahan
    const [hasBeenVisible2, setHasBeenVisible2] = useState(false); // Variabel status tambahan

    function handleScroll() {
        // Mengambil elemen scroll-images dan child pertama
        const scrollImages = document.querySelector('.scroll-images');
        const firstChild = scrollImages?.querySelector('.child');

        if (firstChild) {
            // Mengambil posisi dan lebar scroll-images serta posisi child pertama
            const scrollImagesRect = scrollImages.getBoundingClientRect();
            const firstChildRect = firstChild.getBoundingClientRect();

            // Menentukan apakah posisi child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images
            const isVisible = firstChildRect.top < window.innerHeight && firstChildRect.left >= scrollImagesRect.left && firstChildRect.right <= scrollImagesRect.right;

            // Jika child pertama terlihat dalam viewport dan berada dalam batas lebar scroll-images, set hasBeenVisible menjadi true
            if (!hasBeenVisible && isVisible) {
                setHasBeenVisible(true);
            }
        }
    }


    useEffect(() => {

        // Memanggil fungsi handleScroll saat halaman dimuat dan setiap kali terjadi scroll
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Panggil handleScroll saat halaman pertama kali dimuat

        // Membersihkan event listener saat komponen tidak lagi digunakan
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasBeenVisible]);

    const nextSlide = () => {
        const container = document.querySelector('.scroll-images');
        if (container) {
            const children = container.children;
            const widthswipe = 272 + 16
            let newIndex = currentIndex + 1;
            if (newIndex >= children.length) {
                newIndex = 0;
            }
            setCurrentIndex(newIndex);
            container.scrollTo({
                left: widthswipe * newIndex,
                behavior: 'smooth'
            });
        }
    };

    const prevSlide = () => {
        const container = document.querySelector('.scroll-images');
        if (container) {
            const children = container.children;
            const widthswipe = 272 + 16
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = children.length - 1;
            }
            setCurrentIndex(newIndex);
            container.scrollTo({
                left: widthswipe * newIndex,
                behavior: 'smooth'
            });
        }
    };

    return (

        <div className="cover">
            {currentIndex > 0 && (
                <button className="left" onClick={prevSlide}>
                    <i className="fa fa-angle-left"></i>
                </button>
            )}

            <div className="scroll-images">
                {cardData.map((item, index) => {
                    return (
                        <div className={`child ${hasBeenVisible ? 'animasi' : ''}`} style={{ animationDelay: `${index / 3}s` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z" />
                            </svg>
                            <h4>{item.title}</h4>
                        </div>
                    )
                })}
            </div>
            <button className="right" onClick={nextSlide}>
                <i className="fa fa-angle-right"></i>
            </button>
        </div>
    );
};

export default Slider;
