import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function CheckboxesResponse({ number, data }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
    setSelectedOptions(answer.selected_options);
    }, [answer]);
    return (
        <>
        <div className="space-y-2">
            <TextareaAutosize
            type="text"
            className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
            value={text}
            placeholder="Question"
            readOnly
            />
            {options.map((option, index) => {
            return (
                <div key={index}>
                <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.indexOf(option) > -1}
                    disabled
                    readOnly
                />
                {option}
                </div>
            );
            })}
        </div>
        </>
    );
    }

const data = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
        {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
    ]   
    };

    const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
    }
    };
    const PieChart = () => {
    return (
        <div className="w-full max-w-lg mx-auto">
        <Pie data={data} options={options} />
        </div>
    );
    };

    <div className="w-full max-w-lg mx-auto">
    <Pie data={data} options={options} className="rounded-lg shadow-md" />
    </div>
