import React from 'react';

const Profile = () => {
    // Örnek kullanıcı verisi
    const user = {
        name: 'Mehmet Yılmaz',
        email: 'mehmetyilmaz@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Frontend geliştirici. React ve JavaScript tutkunu.',
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px #eee', borderRadius: 8 }}>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={user.avatar}
                    alt="Profil Fotoğrafı"
                    style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
                />
                <h2>{user.name}</h2>
                <p style={{ color: '#888', marginBottom: 8 }}>{user.email}</p>
                <p>{user.bio}</p>
            </div>
        </div>
    );
};

export default Profile;