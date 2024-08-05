import { React, useState } from 'react';
import Modal from '../../../modal/modalImages';
import air_condicioner from "../../assets/img/air_conditioner.png";
import restaurant from "../../assets/img/restaurant.png";
import wifi from "../../assets/img/wifi.png";
import parking from "../../assets/img/parking.png";
import lift from "../../assets/img/lift.png";
import swim from "../../assets/img/swim.png";
import Resepsionis from "../../assets/img/reception.png";


function ContentDetailDesaWisata({ DetailPenginapan }) {
  const [showExtraImages, setShowExtraImages] = useState(false);

  const handleShowMoreImages = () => {
    setShowExtraImages(true);
  };

  const handleCloseModal = () => {
    setShowExtraImages(false);
  };


  return (
    <div className="cover-detail-penginapan my-top-2">
      <div id="gallery" className="photos-grid-container gallery">
        <div className="main-photo img-box">
          <img src={DetailPenginapan[0].gallery[0].imageUrl} alt="image" />
        </div>
        <div>
          {DetailPenginapan[0].gallery.length <= 5 ? (
            <div className="sub">
              {DetailPenginapan[0].gallery.slice(1, 5).map(photo => (
                <div key={photo.id} className="img-box">
                  <img src={photo.imageUrl} alt="image" />
                </div>
              ))}
            </div>
          ) : (
            <div className="sub">
              {DetailPenginapan[0].gallery.slice(1, 4).map(photo => (
                <div key={photo.id} className="img-box">
                  <img src={photo.imageUrl} alt="image" />
                </div>
              ))}
              <div id="multi-link" className="img-box" onClick={handleShowMoreImages}>
                <img src={DetailPenginapan[0].gallery[4].imageUrl} alt="image" />
                <div className="transparent-box">
                  <div className="caption">Lihat semua</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal show={showExtraImages} onClose={handleCloseModal} images={DetailPenginapan[0].gallery} />
      </div>

      <div className='card-random w-100 my-5 p-4 rounded-10 flex-column'>
        <div className='d-flex flex-row'>
          <span className='mx-1 text-bold text-size-12'>Fasilitas Utama</span>
        </div>
        <div className='container-fasilitas'>
          {DetailPenginapan[0].fasilitas_utama.map((item, index) => {
            return (
              <div key={index} className='item-fasilitas'>
                {item.fasilitas === "air_condisioner" && (
                  <div> 
                    <img src={air_condicioner} width={25}></img>
                    <span className='mx-2'>AC</span>
                  </div>
                )}
                {item.fasilitas === "restaurant" && (
                  <div>
                    <img src={restaurant} width={25}></img>
                    <span className='mx-2'>Restoran</span>
                  </div>
                )}
                {item.fasilitas === "wifi" && (
                  <div>
                    <img src={wifi} width={25}></img>
                    <span className='mx-2'>Wifi</span>
                  </div>
                )}
                {item.fasilitas === "lift" && (
                  <div>
                    <img src={lift} width={25}></img>
                    <span className='mx-2'>Lift</span>
                  </div>
                )}
                {item.fasilitas === "gym" && (
                  <div>
                    <i className="fa-solid fa-dumbbell"></i>
                    <span className='mx-2'>Pusat Kebugaran</span>
                  </div>
                )}
                {item.fasilitas === "parking" && (
                  <div>
                    <img src={parking} width={25}></img>
                    <span className='mx-2'>Parkiran</span>
                  </div>
                )}
                {item.fasilitas === "swim" && (
                  <div>
                    <img src={swim} width={25}></img>
                    <span className='mx-2'>Kolam Renang</span>
                  </div>
                )}
                {item.fasilitas === "24hour_resepionis" && (
                  <div>
                    <img src={Resepsionis} width={25}></img>
                    <span className='mx-2'>Resepsionis 24 Jam</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

export default ContentDetailDesaWisata;
