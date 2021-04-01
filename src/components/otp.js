import React, {createRef} from 'react';

export default function Otp({helper, otp, setOtp}) {
    
    const ref0 = createRef();
    const ref1 = createRef();
    const ref2 = createRef();
    const ref3 = createRef();
    const ref4 = createRef();
    const ref5 = createRef();

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return(
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', borderRadius: 5, justifyContent: 'center'}}>
            <p>{helper}</p>
            <input 
            placeholder="•"
            ref={ref0}
            maxLength="1"
            value={otp.slice(0,1)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center', marginRight: 5}} 
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref1.current.focus();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(event.target.value.slice(1,2) + otp.slice(1));
                        ref1.current.focus();
                    } else {
                        setOtp(otp.slice(1));
                    }
                }
            }}
            />

            <input 
            placeholder="•"
            ref={ref1}
            maxLength="1"
            value={otp.slice(1,2)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center', marginRight: 5}} 
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref2.current.focus();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(otp.slice(0, 1) + event.target.value.slice(1,2) + otp.slice(2));
                        ref2.current.focus();
                    } else {
                        setOtp(otp.slice(0, 1)+ otp.slice(2));
                        ref0.current.focus();
                    }
                }
            }}
            />

            <input 
            placeholder="•"
            ref={ref2}
            maxLength="1"
            value={otp.slice(2,3)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center', marginRight: 5}} 
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref3.current.focus();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(otp.slice(0, 2) + event.target.value.slice(1,2) + otp.slice(3));
                        ref3.current.focus();
                    } else {
                        setOtp(otp.slice(0, 2)+ otp.slice(3));
                        ref1.current.focus();
                    }
                    
                }
            }}
            />

            <input 
            placeholder="•"
            ref={ref3}
            maxLength="1"
            value={otp.slice(3,4)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center', marginRight: 5}} 
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref4.current.focus();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(otp.slice(0, 3) + event.target.value.slice(1,2) + otp.slice(4));
                        ref4.current.focus();
                    } else {
                        setOtp(otp.slice(0, 3)+ otp.slice(4));
                        ref2.current.focus();
                    }
                }
            }}
            />

            <input 
            placeholder="•"
            ref={ref4}
            maxLength="1"
            value={otp.slice(4,5)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center', marginRight: 5}} 
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref5.current.focus();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(otp.slice(0, 4) + event.target.value.slice(1,2) + otp.slice(5));
                        ref5.current.focus();
                    } else {
                        setOtp(otp.slice(0, 4)+ otp.slice(5));
                        ref3.current.focus();
                    }
                }
            }}
            />

            <input 
            placeholder="•"
            ref={ref5}
            maxLength="1"
            value={otp.slice(5)}
            style={{fontSize: 24, width: 38, height: 40, display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}}
            onChange={(event) => {
                if(event.target.value !== '' && event.target.value.length===1 && isNumeric(event.target.value)) {
                    setOtp(otp + event.target.value);
                    ref5.current.blur();
                } else {
                    if(event.target.value.length>1) {
                        setOtp(otp.slice(0, 5) + event.target.value.slice(1,2));
                        ref5.current.blur();
                    } else {
                        setOtp(otp.slice(0, 5));
                        ref4.current.focus();
                    }
                }
            }}
            />

        </div>
    );
}