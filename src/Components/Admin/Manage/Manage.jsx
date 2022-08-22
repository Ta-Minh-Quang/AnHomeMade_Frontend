import React from 'react';
import { useAuth } from '../../../context/authContext';
import ContentManage from './ContentManage';

const Manage = () => {
    return (
        <div >
           <ContentManage></ContentManage>
        </div>
    );
};

export default Manage;
