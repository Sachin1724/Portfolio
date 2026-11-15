import Image from "next/image";
import { CLIENTS } from "@/lib/constants";

export default function Clients() {
    return (
        <section className="band--chuna clients" aria-labelledby="clients-title">
            <div className="wrap">
                <h2 id="clients-title" className="kicker">
                    Shot, cut and built for
                </h2>
                <ul className="clients__row">
                    {CLIENTS.map((client, i) => (
                        <li key={client.name} className="client">
                            <Image
                                src={client.logo}
                                alt=""
                                width={176}
                                height={176}
                                className={`client__logo ${i === 6 ? "client__logo--contain" : ""}`}
                            />
                            <span className="client__name">{client.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
