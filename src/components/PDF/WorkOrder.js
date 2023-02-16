import React, { useState } from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Svg } from '@react-pdf/renderer';

// Create Document Component
const WorkOrder = ({codes, location}) => {
    return (
        <Document>
            {codes.map(code => (
                <Page size={{width: 1275, height: 1650}} key={code}>
                    <Image src="/template.jpg" />
                    <Image src={"/" + location + ".png"} style={{width: '175px', height: '85px', top: '22px', left: '86px', position: 'absolute'}}/>
                    <Image src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${code}&parsefnc&alttext=${code}`} style={{width: '128px', height: '113px', top: '17px', left: '1015px', position: 'absolute'}}/>
                </Page>
            ))} 
        </Document>
    )
}

export default WorkOrder