import React, { useEffect } from 'react'
import style from '../style.module.css';

const MySkeletonBlocks = ({ width, height }) => {
    return (
        <div className={style.skeleton} style={{ width: width, height: height, background: "#a5a5a5" }}>
        </div>
    )
}

const Skeleton = ({ hasImg }) => {
    return (
        <div className={`d-flex align-items-start ${style.skeletonContainer}`}>
            <div style={{ width: "100%" }}>
                <div style={{ marginBottom: "14px", marginTop: "4px" }}>
                    <MySkeletonBlocks width={'100%'} height={'50px'} />
                </div>
                <div style={{ marginBottom: "30px" }}>
                    <MySkeletonBlocks width={'40%'} height={'24px'} />
                    <MySkeletonBlocks width={'100%'} height={'90px'} />
                    <MySkeletonBlocks width={'100%'} height={'90px'} />
                    <MySkeletonBlocks width={'100%'} height={'90px'} />
                    <MySkeletonBlocks width={'100%'} height={'90px'} />
                    <MySkeletonBlocks width={'20%'} height={'20px'} />
                </div>
                <div>
                    <MySkeletonBlocks width={'40%'} height={'24px'} />
                    <MySkeletonBlocks width={'100%'} height={'40px'} />
                    <MySkeletonBlocks width={'100%'} height={'40px'} />
                    <MySkeletonBlocks width={'100%'} height={'40px'} />
                    <MySkeletonBlocks width={'100%'} height={'40px'} />
                    <MySkeletonBlocks width={'20%'} height={'20px'} />
                </div>
            </div>
        </div>
    )
}

export default Skeleton