import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async() => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setError(false);
                setListing(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl text-brownish'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl text-brownish'>Something went wrong!</p>}
        {listing && !loading && !error && ( <div>
            <Swiper navigation>
            {
                listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                        <div className='h-[400px]' style={{background: `url(${url}) center no-repeat` ,backgroundSize: 'cover'}}>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
            <div className='fixed top-[14%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-whitecream cursor-pointer'>
                <FaShare className='text-cream' onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                    setCopied(false);
                    }, 2000);
                }}
                />
            </div>
            {copied && (
                <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-whitecream p-2 text-cream'>
                Link copied!
                </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold text-brownish'>
              {listing.name} - Rs.{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-cream  text-sm'>
              <FaMapMarkerAlt className='text-cream' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-cream w-full max-w-[200px] text-whitish text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-brownish w-full max-w-[200px] text-whitish text-center p-1 rounded-md'>
                  Rs. {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-cream'>
              <span className='font-semibold text-brownish'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-brownish font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button onClick={() => setContact(true)} className='bg-brownish text-whitish rounded-lg uppercase hover:opacity-95 p-3'>Contact landlord</button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
        )}
    </main>
  )
}
