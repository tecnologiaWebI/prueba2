import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setloading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    useEffect(() => {
        //api
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_nxOsushE5XT1Zrw6ULvn8uIRtTrOU`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setloading(false));
    }, [country]);

    //pantalla de carga
    if(isFetching && loading) return <Loader title="Cargando..."/>;

    if(error && country) return <Error />;

    return (
        <>
            <style>
                {`
                    @keyframes blinker {
                        50% {
                            opacity: 0;
                        }
                    }
                    @keyframes rocket {
                        0% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                        100% {
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                    By <br /> <br />
                    <span style={{color: '#ff0000', animation: 'blinker 1s linear infinite'}}>Daniel Mancilla</span> 🚀<br /> <br />
                    <span style={{color: '#00ff00', animation: 'blinker 1s linear infinite'}}></span> <br /> <br />
                    y los otros vagos <br /> <br />
                    <span style={{color: '#0000ff', animation: 'blinker 1s linear infinite'}}>Alexander Ruiz Gareca</span> <br /> <br />
                    <span style={{color: '#ff00ff', animation: 'blinker 1s linear infinite'}}>Jhon serrano</span> <br /> <br />
                    <span style={{color: '#ffff00', animation: 'blinker 1s linear infinite'}}>Benja ..</span> <br /> <br />
                    una aplicacion de grupito 3
                </h2>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.map((song, i) => (
                        <SongCard 
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            i={i}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};

export default AroundYou;

