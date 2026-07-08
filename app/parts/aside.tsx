import Image from "next/image";
import Link from 'next/link'


export default function Asidebar() {
    return <aside className="boczny">
        <div id="pierwszyblok" >
            <Link href="/" className="Link"><Image src={"/images/home.png"} alt="homeicon" width={25} height={25} /><button>Główna</button></Link>
            <Link href="/" className="Link"><Image src={"/images/shorts.png"} alt="shorts" width={25} height={25} /><button>Shorts</button></Link>
        </div><br />
        <hr />
        <div className="suby">
            <h1>Subskrypcje &gt;</h1>
        </div>
        <hr />
        <div id="drugiblok">
            <h1>Ty &gt;</h1>
            <Link href="/" className="Link"><Image src={"/images/yourchannelicon.png"} alt="yourchannel" width={25} height={25} /><button>Twój Kanał</button></Link>
            <Link href="/" className="Link"><Image src={"/images/history.png"} alt="historia ogladania" width={25} height={25} /><button>Historia</button></Link>
            <Link href="/" className="Link"><Image src={"/images/playlist.png"} alt="playlisty" width={25} height={25} /><button>Playlisty</button></Link>
            <Link href="/" className="Link"><Image src={"/images/watchlater.png"} alt="do obejrzenia" width={25} height={25} /><button>Do obejrzenia</button></Link>
            <Link href="/" className="Link"><Image src={"/images/like.png"} alt="polubione filmy" width={25} height={25} /><button>Polubione filmy</button></Link>
            <Link href="/" className="Link"><Image src={"/images/video.png"} alt="polubione filmy" width={25} height={25} /><button>Twoje filmy</button></Link>
            <Link href="/" className="Link"><Image src={"/images/download.png"} alt="pobrane" width={25} height={25} /><button>Pobrane</button></Link>

        </div>
    </aside>
}