"use client";

import React from 'react';

interface ProfileCardProps {
    name: string;
    username: string;
    role: string;
    profileImage: string;
    timeAgo?: string;
}

export const ProfileCard = ({
    name,
    username,
    role,
    profileImage,
    timeAgo = "Active"
}: ProfileCardProps) => {
    return (
        <>
            <style jsx>{`
        .hover-scale {
          transition: transform 700ms ease-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .image-scale {
          transition: transform 700ms ease-out;
        }
        
        .image-container:hover .image-scale {
          transform: scale(1.03);
        }
        
        .hover-translate {
          transition: transform 500ms ease-out;
        }
        
        .hover-translate:hover {
          transform: translateX(4px);
        }
        
        .hover-scale-sm {
          transition: transform 500ms ease-out;
        }
        
        .hover-scale-sm:hover {
          transform: scale(1.1);
        }
      `}</style>

            <div className="w-full max-w-md">
                <div className="glass-strong rounded-3xl shadow-lg overflow-hidden hover-scale border border-white/20">
                    <div className="relative overflow-hidden image-container">
                        <img
                            src={profileImage}
                            alt={name}
                            className="w-full aspect-square object-cover image-scale"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        <div className="absolute top-6 left-6">
                            <h2 className="text-2xl font-medium text-white drop-shadow-lg">{name}</h2>
                        </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden hover-scale-sm ring-2 ring-white/20">
                                <img
                                    src={profileImage}
                                    alt={username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hover-translate">
                                <div className="text-sm text-white font-medium">{username}</div>
                                <div className="text-xs text-white/60">{timeAgo}</div>
                            </div>
                        </div>
                        <div className="bg-[#cc1a3e] text-white rounded-lg px-4 py-2 text-sm font-medium glow-pink">
                            {role}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;
