import React, { useState } from 'react';

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

    const [currentIndex, setCurrentIndex] = useState(1);

    // Fungsi untuk menampilkan card selanjutnya
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1));
        console.log(currentIndex);
    };

    // Fungsi untuk menampilkan card sebelumnya
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
    };

    return (
        <div className="slider-container">
            <button className="prev-button" onClick={prevSlide}>Prev</button>
            <div className="slider">
                {cardData.map((card, index) => (
                    <div
                        key={card.id}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={card.imageUrl} alt={card.title} />
                        <h3>{card.title}</h3>
                    </div>
                ))}
            </div>
            <button className="next-button" onClick={nextSlide}>Next</button>
        </div>
    );
};

export default Slider;
