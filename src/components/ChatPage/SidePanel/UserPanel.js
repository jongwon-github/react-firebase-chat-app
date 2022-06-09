import React, { useRef } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import mime from 'mime-types';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setPhotoURL } from '../../../redux/actions/user_action';
import { getDatabase, ref as dRef, child, update } from 'firebase/database';

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputOpenImageRef = useRef();
  const auth = getAuth();
  const db = getDatabase();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const storage = getStorage();
  const storageRef = ref(storage, `user_image/${user.uid}`);
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    try {
      // 스토리지에 파일 저장하기
      // Create file metadata including the content type
      const metadata = { contentType: mime.lookup(file.name) };
      // Upload the file and metadata
      const uploadTask = uploadBytes(storageRef, file, metadata);
      console.log('uploadTask', uploadTask);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log('downloadURL : ', downloadURL);

      // 스토리지에 변경된 프로필 사진으로
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      //
      dispatch(setPhotoURL(downloadURL));

      //
      await update(child(dRef(db), `users/${user.uid}`), {
        image: downloadURL,
      });
    } catch (error) {}
  };

  return (
    <div>
      {/* Logo */}
      <h3 style={{ color: 'white' }}>
        <IoIosChatboxes /> Chat App
      </h3>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Image
          src={user && user.photoURL}
          style={{ width: '30px', height: '30px', marginTop: '3px' }}
          roundedCircle
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: 'transparent', border: '0px' }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleLogout}>
              로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        style={{ display: 'none' }}
        ref={inputOpenImageRef}
        type="file"
      />
    </div>
  );
}

export default UserPanel;
