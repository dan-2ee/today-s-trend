import styled from "styled-components";
import {LineChart} from 'recharts';

export const search_content = styled.div`
    margin-top: 5%;
`;

export const chart_content = styled.div`
    min-height: 500px;
    padding: 10px;
    background: #fff;
    display: flex;
`;


export const chart = styled(LineChart)`
    margin-top: 2%;
    margin-left: 25%;
`;