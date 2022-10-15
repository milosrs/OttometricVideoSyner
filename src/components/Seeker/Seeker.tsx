import React, { forwardRef } from 'react'
import { P } from 'ts-pattern'

interface IProps {
    name: string;
    maxTime: number;
    onChange: (value: number) => void;
}

export const Seeker = forwardRef((props: IProps, ref: React.ForwardedRef<HTMLInputElement>) => 
<>
<input 
    ref={ref}
    type="range" 
    id={props.name}
    min="0"
    max={props.maxTime}
    step={0.002}
    onChange={(e) => props.onChange(parseFloat(e.currentTarget.value))}/>
</>
)