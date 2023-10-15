'use client'
import T7overhead from "../../assets/777overhead.svg";
import React, {useEffect, useState} from 'react';

export default function TripleSeven() {

    useEffect(() => {
        const svgElement = document.getElementById('t7overhead')
        console.log(svgElement);
        if (svgElement) {
          const rectElements = svgElement.querySelectorAll("rect");
          const handleClick = (event) => {
            console.log(event.target.id);
            const url = "/api/url?id=" + event.target.id + "&ac=" + aircraft;
            fetch(url);
          };
          rectElements.forEach(rect => {
            rect.addEventListener("click", handleClick);
          })
    
        }
        return () => {
          const handleClick = (event) => {
            console.log(event.target);
          };
          const rectElements = svgElement.querySelectorAll('rect');
          rectElements.forEach(rect => {
            rect.removeEventListener('click', handleClick);
          })
        }
      }, []);
    
    return(
        <T7overhead id="t7overhead" />
    )
}