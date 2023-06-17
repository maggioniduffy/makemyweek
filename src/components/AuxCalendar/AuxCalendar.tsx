import React from "react";

const WhiteSpace = () => <div className="bg-transparent h-full w-full"></div>;

interface GrayProps {
  h?: string;
}
const GraySpace = ({ h = "14" }: GrayProps) => {
  return (
    <div className="h-24">
      <div className={`bg-gray rounded-lg h-${h} bg-opacity-50 w-full`}></div>
    </div>
  );
};

const AuxCalendar = () => {
  return (
    <table className="table-fixed bg-white w-10/12 rounded-xl shadow h-full m-48 p-8">
      <thead className="h-12">
        <span></span>
      </thead>
      <tbody className="m-4">
        <tr>
          <td>
            <GraySpace h="12" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="18" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="24" />
          </td>
          <td>
            <GraySpace h="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="16" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AuxCalendar;
