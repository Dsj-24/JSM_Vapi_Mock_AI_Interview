'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = () => {

    const isSpeaking = true;
      const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
      const messages = ["What is your name?","My name is JOhn Doe"]
      const lastMssg = messages[messages.length-1];

    return (
        <>
        <div className='call-view'>

            <div className='card-interviewer' >

                <div className='avatar'>
                    <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
                    {isSpeaking && <span className='animate-speak' ></span>}
                </div>
                <h3>AI Interviewer</h3>

            </div>

            <div className="card-border">
                <div className="card-content">
                    <Image
                        src="/user-avatar.png"
                        alt="profile-image"
                        width={539}
                        height={539}
                        className="rounded-full object-cover size-[120px]"
                    />
                    {/* <h3>{userName}</h3> */}
                </div>

            </div>

        </div>
        {messages.length > 0 && (<div className='transcript-border my-6'>
            <div className='transcript'>
                <p key={lastMssg} className={cn(  "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100")}>
                {lastMssg}
                </p>
            </div>
            
        </div>)}
        
        <div className='w-full flex justify-center'>
            {callStatus !== 'ACTIVE' ? (
                <button className='relative btn-call'>
                     <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>

                </button>
            ):(
                  <button className='btn-disconnect'>
                        END
                  </button>
            )}
        </div>
        </>
    )
}

export default Agent