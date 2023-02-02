import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
} from "@chakra-ui/modal";
import {
	Button,
	Input,
	FormControl,
	FormErrorMessage,
	FormLabel,
} from "@chakra-ui/react";
import TextField from "./Login/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const AddFriendModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a friend</ModalHeader>
				<ModalCloseButton />
				<Formik
					initialValues={{ friendName: "" }}
					validationSchema={Yup.object({
						friendName: Yup.string()
							.required("Username required")
							.min(6, "Username too short!")
							.max(28, "Username too long!"),
					})}
					onSubmit={() => {
						onClose();
					}}
				>
					<Form>
						<ModalBody w={"100%"}>
							<TextField name="friendName" label={"Friends name"} placeholder="enter your friends name"/>
						</ModalBody>
						<ModalFooter w={"100%"}>
							<Button colorScheme="blue" type="submit">
								Submit
							</Button>
						</ModalFooter>
					</Form>
				</Formik>
			</ModalContent>
		</Modal>
	);
};

export default AddFriendModal;
