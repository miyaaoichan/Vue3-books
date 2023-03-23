<template>
    <div class="container">
        <div class="modal">
            <slot></slot>
        </div>
        <div class="close">
                <Icon size="50" @click="closeModal">
                    <CloseCircle />
                </Icon>
            </div>
        <div class="forward">
            <Icon size="50" @click="nextBook">
                <ArrowForwardCircleSharp />
            </Icon>
        </div>
        <div class="backward" @click="previousBook">
            <Icon size="50">
                <ArrowBackCircleSharp />
            </Icon>
        </div>
    </div>

</template>

<script setup>
import { Icon } from "@vicons/utils"
import { ArrowForwardCircleSharp, ArrowBackCircleSharp, CloseCircle } from "@vicons/ionicons5"

const props = defineProps({
    show: Boolean
})

const emit = defineEmits(["closeModal","nextBook","previousBook"])

function closeModal() {
    emit("closeModal")
}
function nextBook(){
    emit("nextBook")
}
function previousBook(){
    emit("previousBook")
}
</script>

<style scoped>
.container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0.2);
    z-index: 20;
}
.modal {
    position: relative;
    width: 1000px;
    height: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(234, 228, 220, 1);
    border-radius: 30px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
    z-index: 50;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}

.close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-100%, 50%);
    cursor: pointer;
}

.forward {
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(-300%, -50%);
}

.backward {
    cursor: pointer;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translate(300%, -50%);
}
</style>