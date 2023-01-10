import React, { useState } from "react";
import useSWR from "swr";
import { PrismaClient} from "@prisma/client";
import axios from "axios";
import { Fetcher } from "swr";
import Link from 'next/link'


export async function getServerSideProps(){
	
	const prisma = new PrismaClient()
	
	prisma.$on('beforeExit', async () => {
  console.log('beforeExit hook')
  // PrismaClient still available
})

  const users = await prisma.cockie.findMany();
await prisma.$disconnect();

    return {
        props: {users},
    }
}



function Leaderboard ({users}){

    const data = Array.from(users)
    const [userdata, setLogindata] = useState(data);


    return (
        <div className="html">
        <div className="appcontainer">
            <div className="base">
            <h1>🏆 Rangliste 🏆</h1>
            <h2><Link href='/'>Zurück zur Startseite</Link></h2>
            <table>
                <thead>
                    <tr>
                        <th className="second">Benutzername</th>
                        <th className="third">Kekse</th>
                        <th className="fourth">Autoclicker</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.map((user)=> (
                        <tr key={user.id}className={user.username === "admin" ? "username" : "red"}>
                            <td className="first">{user.username}</td>
                            <td>{user.cockie}</td>
                            <td>{user.autoclicker}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
                  

}
export default Leaderboard;