import React, { useEffect } from 'react'
import style from './style.module.css';

const MySkeletonBlocks = ({ width, height }) => {
    return (
        <div className={style.skeleton} style={{ width: width, height: height, background: "#a5a5a5" }}>
        </div>
    )
}

const Skeleton = ({ hasImg }) => {
    useEffect(() => {
        console.log('girdi');
    }, []);
    return (
        <div className={`d-flex align-items-start ${style.skeletonContainer}`}>
            <div style={{ marginRight: "10px" }}>
                <MySkeletonBlocks width={'40px'} height={'40px'} />
            </div>
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "300px", marginBottom: "10px" }}>
                    <MySkeletonBlocks width={'100px'} height={'18px'} />
                    <MySkeletonBlocks width={'100px'} height={'18px'} />
                    <MySkeletonBlocks width={'90px'} height={'18px'} />
                </div>
                <MySkeletonBlocks width={'120px'} height={'16px'} />
                <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                    <MySkeletonBlocks width={'34px'} height={'14px'} />
                </div>
                {
                    hasImg ?
                        <div className='my-2'>
                            <MySkeletonBlocks width={'100%'} height={'260px'} />
                        </div>
                        :
                        <div className='my-3 d-flex' style={{ flexWrap: "wrap" }}>
                            <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "5px"}}>
                                <MySkeletonBlocks width={'210px'} height={'20px'} />
                                <MySkeletonBlocks width={'60px'} height={'20px'} />
                                <MySkeletonBlocks width={'180px'} height={'20px'} />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <MySkeletonBlocks width={'250px'} height={'20px'} />
                            <MySkeletonBlocks width={'200px'} height={'20px'} />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Skeleton