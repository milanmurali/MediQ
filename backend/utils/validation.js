export const validatePatient = ({
    name,
    age,
    gender,
    mobile,
    department,
}) => {
    if (!name?.trim())
        return "Name is required";

    if (!age)
        return "Age is required";

    if (!Number.isInteger(Number(age)))
        return "Age must be a valid number";

    if (age < 1 || age > 120)
        return "Age must be between 1 and 120";

    if (!gender)
        return "Gender is required";

    if (!department)
        return "Department is required";

    if (!/^\d{10}$/.test(mobile))
        return "Mobile number must contain exactly 10 digits";

    return null;
};