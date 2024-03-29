import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchLandlord = async() => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
                console.log(landlord);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef]);

    const onChange = (e) => {
        setMessage(e.target.value);
    }
  return (
    <div>
        {landlord && (
            <div className='flex flex-col gap-2 text-brownish'>
                <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter your message here..." className='w-full border p-3 rounded-lg bg-white text-cream'></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-cream text-whitish text-center p-3 uppercase rounded-lg hover:opacity-95'>
                    Send Message
                </Link>
            </div>
        )}
    </div>
  )
}
