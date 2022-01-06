import React from "react";
import "./SearchFail"
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import {Breadcrumb, Tag} from "antd";
import {useSelector} from "react-redux";
import * as S from "./SearchStyle"

const parseToChartData = (searchData: string[]) => {
    let _periodSet = new Set();
    searchData?.forEach((row: any) => _periodSet.add(row?.period));
    const _periodArr = Array.from(_periodSet);    //_periodArr = period array

    return  _periodArr?.map((_period: any) => {
        const filtered = searchData?.filter((row: any) => {
            const { period } = row;
            return period === _period      //searchData 중애서 period 같으면 반환
        });

        const parsedObject = filtered?.reduce((acc: any, filteredRow: any) => {    //acc:result, filteredRow: value
            const {ratio, group} = filteredRow;
            //console.log(ratio, group)      // {"period:"2020-11-29", "10":100, "20":21.345}
            return {
                ...acc,
                [group]: ratio
            }
        }, {});      //{}: init value
        //date, group:ratio 합침
        return {
            ...parsedObject,
            _period
        }
    })

}

const group:{age:string, color:string}[] = [
    {age: "10", color: "#8884d8"},
    {age: "20", color: "#FFF064"},
    {age: "30", color: "#288CFF"},
    {age: "40", color: "#FFD2D7"},
    {age: "50", color: "#82ca9d"},
    {age: "60", color: "#82EB5A"}
]

function Search(): any {
    const selector = useSelector<string[]>(state => state);

    // @ts-ignore
    const data = parseToChartData(selector?.list)
    console.log(data)
        return (
            <S.search_content>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Src</Breadcrumb.Item>
                    <Breadcrumb.Item>Components</Breadcrumb.Item>
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                </Breadcrumb>
                <S.chart_content>
                    <S.chart width={903} height={430} data={data} id={"chart"}
                               margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="_period"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        {group.map((user) =>
                            user.age in data[0] ?
                                <Line key={user.age} type="monotone" strokeWidth={3} dataKey={user.age}
                                      stroke={user.color}/> : null
                        )}
                    </S.chart>
                    <div>
                        <Tag color="#f50">#f50</Tag>
                        <Tag color="#2db7f5">#2db7f5</Tag>
                        <Tag color="#87d068">#87d068</Tag>
                        <Tag color="#108ee9">#108ee9</Tag>
                    </div>
                </S.chart_content>
            </S.search_content>
        )
}
export default Search;