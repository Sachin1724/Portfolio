import Image from "next/image";
import { CLIENTS } from "@/lib/constants";

export default function Clients() {
    return (
        <section className="wrap clients" aria-labelledby="clients-title">
            <p id="clients-title" className="eyebrow mono">
                SHOT, CUT AND BUILT FOR
            </p>
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
                        <span className="mono">{client.name}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
