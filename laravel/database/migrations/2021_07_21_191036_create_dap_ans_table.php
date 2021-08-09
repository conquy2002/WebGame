<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDapAnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dap_ans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('a',255);
            $table->string('b',255);
            $table->string('c',255);
            $table->string('d',255);
            $table->string('true',255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dap_ans');
    }
}
